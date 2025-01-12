import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { Container } from './Container';
import SearchInput from './SearchInput';
import CartButton from './CartButton';
import CartSheet from './CartSheet';

const Header = () => {
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
        <SearchInput />
        {/* Правая часть */}
        <div className="flex gap-4 ml-7">
          <Button variant="outline" className="flex items-center gap-2">
            <User size={16} />
            Войти
          </Button>
          <div>
            <CartSheet/>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
