import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '../../../../prisma/prismaClient';
import { ingredients } from '../../../../prisma/constant';
import { findOrCreateCart } from '@/lib/findOrCreateCart';
import { CreateCartItemValues } from '../../../../@types/prisma';
import { updateCartTotalAmount } from '@/lib/updateCartTotalAmount';

export async function GET(req: NextRequest) {
  try {
    // const userId = 1;
    const token = req.cookies.get('cartToken')?.value;
    

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      //   здесь мы говорим, что дай нам все товоры
      include: {
        items: {
          orderBy: {
            createdAt: 'desc' /* и остортируй эти товары */,
          },
          include: {
            productItem: {
              include: {
                product: true /* дай нам сам продукт */,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
  
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;
    

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    // const data = (await req.json()) as CreateCartItemValues;
    const data = (await req.json()) as {
      productItemId: number;
      ingredients?: { id: number }[];
    };

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredients?.map((ingredient) => ingredient.id) },
          },
        },
      },
    });
    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((ingredient) => ({ id: ingredient.id })) },
        },
      });

      const updatedUserCart = await updateCartTotalAmount(token);

      const resp = NextResponse.json(updatedUserCart);
      resp.cookies.set('cartToken', token);
      return resp;
    }
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[CART_DELETE] Запрос на удаление с body:', body);

    const { id } = body;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      console.log('[CART_DELETE] Ошибка: Cart token not found');
      return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });
    }

    if (!id || isNaN(Number(id))) {
      console.log('[CART_DELETE] Ошибка: Invalid cart item ID', id);
      return NextResponse.json({ error: 'Invalid cart item ID' }, { status: 400 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) {
      console.log('[CART_DELETE] Ошибка: Cart item not found');
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: Number(id) },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    console.log('[CART_DELETE] Успешное удаление, обновленный список:', updatedUserCart);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товар из корзины' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { productItemId, quantity } = await req.json();

    // Проверяем, существует ли такой товар в корзине
    const cartItem = await prisma.cartItem.findFirst({
      where: { productItemId },
    });

    if (!cartItem) {
      return NextResponse.json({ message: 'Товар не найден' }, { status: 404 });
    }

    // Обновляем количество в БД
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
    });

    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.error('[CART_PUT] Ошибка сервера:', error);
    return NextResponse.json({ message: 'Ошибка обновления корзины' }, { status: 500 });
  }
}
