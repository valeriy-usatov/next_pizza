'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import CartButton from './CartButton';
import CartSheet from './CartSheet';
import { Container } from './Container';
import ProfileButton from './ProfileButton';
import SearchInput from './SearchInput';
import AuthModal from './modal/auth-modal/AuthModal';
import Router from 'next/router';


interface Props {
  isHasSearch?: boolean;
  isHasCart?: boolean;
  className?: string;
}
const Header: React.FC<Props> = ({ isHasSearch = true, isHasCart = true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  console.log('session', session);
  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('Заказ успешно оплачен! Информация отправлена на почту.');
      }, 500);
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  return (
    <header className="border-b">
      <Container className="flex  justify-between gap-10 items-center py-10 ">
        {/* Левая часть */}
        <Link href="/" className="flex gap-4 items-center">
          <Image src="/logo.png" alt="Image" width={35} height={35} />
          <div>
            <h3 className="text-2xl uppercase font-black">NEXT PIZZA</h3>
            <p className="text-[#7b7b7b] text-sm leading-3">вкусней уже некуда</p>
          </div>
        </Link>
        {/* Центр */}
        {isHasSearch && <SearchInput />}
        {/* Правая часть */}
        <div className="flex gap-4 ml-7">
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {isHasCart && (
            <div>
              <CartSheet>
                <CartButton />
              </CartSheet>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
