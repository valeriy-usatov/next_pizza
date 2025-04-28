"use client";
export const dynamic = "force-dynamic";

import { createOrder } from "@/app/actions";
import { AdressInput } from "@/components/shared/AddressInput";
import CartItem from "@/components/shared/CartItem";
import CheckoutSidebar from "@/components/shared/CheckoutSidebar";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/components/shared/constants/FormSchema";
import { Container } from "@/components/shared/Container";
import ErrorText from "@/components/shared/formComponents/ErrorText";
import FormArea from "@/components/shared/formComponents/FormArea";
import FormInput from "@/components/shared/formComponents/FormInput";
import PhoneInput from "@/components/shared/formComponents/PhoneInput";
import { WhiteBlock } from "@/components/shared/WhiteBlock";
import { useCartStore } from "@/store/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { Suspense, useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const CheckoutPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { pizzas, totalAmount, loading } = useCartStore();
  // const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };
  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Container className="mt-10">
        <h2 className="font-extrabold text-4xl mb-8">Оформление заказа</h2>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-10 ">
              {/* левая часть  */}

              <div className="flex flex-col gap-10 flex-1 mb-20">
                <WhiteBlock title="1. Корзина" className="">
                  {pizzas.map((pizza) => (
                    <CartItem key={pizza.name} pizza={pizza} />
                  ))}
                </WhiteBlock>

                <WhiteBlock title="2. Персональные данные">
                  <div className="grid grid-cols-2 gap-5">
                    <FormInput
                      name="firstName"
                      className="text-base"
                      placeholder="Имя"
                    />
                    <FormInput
                      name="lastName"
                      className="text-base"
                      placeholder="Фамилия"
                    />
                    <FormInput
                      name="email"
                      className="text-base"
                      placeholder="E-mail"
                    />
                    <PhoneInput
                      name="phone"
                      className="text-base"
                      placeholder="Телефон"
                    />
                  </div>
                </WhiteBlock>
                <WhiteBlock title="3. Адрес доставки">
                  <div className="flex flex-col gap-5">
                    <Controller
                      control={form.control}
                      name="address"
                      render={({ field, fieldState }) => (
                        <>
                          <AdressInput onChange={field.onChange} />
                          {fieldState.error?.message && (
                            <ErrorText text={fieldState.error.message} />
                          )}
                        </>
                      )}
                    />
                    <FormArea
                      name="comment"
                      className="text-base"
                      rows={5}
                      placeholder="Укажите дополнительную информацию для курьера"
                    />
                  </div>
                </WhiteBlock>
              </div>
              {/* Правая часть */}
              <CheckoutSidebar
                loading={loading || submitting}
                totalAmount={totalAmount}
              />
            </div>
          </form>
        </FormProvider>
      </Container>
    </Suspense>
  );
};

export default CheckoutPage;
