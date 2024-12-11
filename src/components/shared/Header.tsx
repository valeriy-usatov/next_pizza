import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { User, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { Container } from './Container';
import SearchInput from './SearchInput';

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
            <Button className="group flex items-center gap-2 text-white relative">
              <span className="">502 р</span>
              <span className="w-[1px] h-full bg-white/30 mx-3"></span>
              <div className="flex items-center gap-1 duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} color="#fff" strokeWidth={2} className="" />
                <span>3</span>
              </div>
              <ArrowRight
                size={16}
                color="#fff"
                strokeWidth={2}
                className="absolute right-5 duration-300 -translate-x-2 opacity-0 group-hover:opacity-100"
              />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
