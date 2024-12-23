type PiizaSizeItems = {
  name: string;
  value: string;
  disabled?: boolean;
};

export const sortIems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавит', type: 'name', order: 'asc' },
];

// export const pizzaSizeItems = {
//   20: 'Маленькая',
//   30: 'Средняя',
//   40: 'Большая',
// } as const;

export const pizzaSizeItems: PiizaSizeItems[] = [
  { name: 'Маленькая', value: '20' },
  { name: 'Средняя', value: '30', disabled: true },
  { name: 'Большая', value: '40' },
];

export const pizzaTypeItems = {
  1: 'традиционное',
  2: 'тонкое',
} as const;
