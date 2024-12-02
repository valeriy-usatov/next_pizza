import Categories from '@/components/shared/Categories';
import { Container } from '@/components/shared/Container';
import Filters from '@/components/shared/Filters';
import Header from '@/components/shared/Header';
import ProductCart from '@/components/shared/ProductCart';
import ProductsGroupList from '@/components/shared/ProductsGroupList';
import SortPopup from '@/components/shared/SortPopup';
import Counter from '@/components/shared/Template';

import TopBar from '@/components/shared/TopBar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <h1 className="lg:text-lg xl:text-3xl 2xl:text-4xl font-bold">Все пиццы</h1>
        <TopBar />
        <div className="flex gap-20 mt-10">
          {/* ФИЛЬТРАЦИЯ */}
          <div className="w-1/4">
            <Filters />
          </div>
          {/* СПИСОК ТОВАРОВ */}
          <div className="w-3/4">
            <ProductsGroupList
              title="Пиццы"
              items={[
                {
                  id: 1,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 2,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 3,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 4,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 5,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
              ]}
              listClassName=""
              categoryId={1}
              className=""
            />
            <ProductsGroupList
              title="Комбо"
              items={[
                {
                  id: 1,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 2,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 3,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 4,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 5,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
              ]}
              listClassName=""
              categoryId={2}
              className=""
            />
            <ProductsGroupList
              title="Закуски"
              items={[
                {
                  id: 1,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 2,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 3,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 4,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 5,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
              ]}
              listClassName=""
              categoryId={3}
              className=""
            />
            <ProductsGroupList
              title="Коктели"
              items={[
                {
                  id: 1,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 2,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 3,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 4,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
                {
                  id: 5,
                  title: 'Чизбургер-Пицца',
                  items: [{ price: 500, id: 1 }],
                  imageUrl:
                    'https://media.dodostatic.net/image/r:292x292/11EF12B2F6AFD043932EFBBAF24F90DF.avif',
                },
              ]}
              listClassName=""
              categoryId={4}
              className=""
            />
          </div>
          {/* <Counter/> */}
        </div>
      </Container>
    </>
  );
}
