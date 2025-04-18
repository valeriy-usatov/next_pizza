'use server';

import { CheckoutFormValues } from '@/components/shared/constants/FormSchema';
import { prisma } from '../../prisma/prismaClient';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';
import { sendEmail } from '@/lib/sendEmail';
import { PayOrderTemplate } from '@/components/shared/email-template/PayOrder';
import { createPayment } from '@/lib/createPayment';

export async function createOrder(data: CheckoutFormValues) {
  try {
    // у северных экшенов нет метода req const token = req.cookies.get('cartToken')?.value и поэтому мы используем специальную функцию, чтобы вытащить куки cookies()
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error('Cart not found');
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }
    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        products: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    //   TODO Сделать создания ссылки оплаты
    const paymentData = await createPayment({
      amount: order.totalAmount /* общая сумма всего заказов */,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    });

    if (!paymentData) {
      throw new Error('Payment data not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId:
          paymentData.id /* Это id от юкассы , если наш клиент отказывается от покупок, то можно по этому id вернуть деньги */,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url; /* перенаправляет на наш платежный сервис */
    // await sendEmail(
    //   data.email,
    //   'Pizza / Оплатите заказ #' + order.id,
    //   PayOrderTemplate({
    //     orderId: order.id,
    //     totalAmount: order.totalAmount,
    //     paymentUrl,
    //   }),
    // );
    return paymentUrl;
  } catch (error) {
    console.log('[CreateOrder] Server error', error);
  }
}
