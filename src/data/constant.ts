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

export const pizzaSizeItems: PiizaSizeItems[] = [
  { name: 'Маленькая', value: '20' },
  { name: 'Средняя', value: '30' },
  { name: 'Большая', value: '40' },
];

export const pizzaTypeItems = [
  {name: 'традиционное', value:'1'},
  { name: 'тонкое',  value:'2'}
]

const newArray = [30,40]