import { Product } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  name?: string;
  size: 20 | 30 | 40;
}

const PizzaImage = ({ imageUrl, size }: Props) => {
  const imageSize =
    size === 20
      ? 'w-[300px] h-[300px]'
      : size === 30
      ? 'w-[400px] h-[400px]'
      : 'w-[500px] h-[500px]';

     
  return (
    <div className="flex items-center justify-center flex-1 relative w-full">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Logo"
          width={500}
          height={500}
          className={`relative left-2 top-2 transition-all z-10 duration-300 ${imageSize}`}
        />
      )}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
    </div>
  );
};

export default PizzaImage;
