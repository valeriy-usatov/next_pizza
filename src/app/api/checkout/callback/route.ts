import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";
import { PaymentCallbackData } from "../../../../../@types/yookassa";
import { sendEmail } from "@/lib/sendEmail";
import { CartItemDTO } from "../../../../../@types/cartTypes";
import { OrderSuccess } from "@/components/shared/email-template/OrderSuccess";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.DELIVERED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(
      order?.products as string,
    ) as CartItemDTO[]; /* находим товары которые есть */

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza / Ваш заказ успешно оформлен 🎉",
        OrderSuccess({ orderId: order.id, items }),
      );
    } else {
      // Письмо о неуспешной оплате
    }
  } catch (error) {
    console.log("[Checkout Callback] Error:", error);
    return NextResponse.json({ error: "Server error" });
  }
}
