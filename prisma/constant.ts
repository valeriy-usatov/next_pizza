export const categories = [
  {
    name: "Пиццы",
  },
  {
    name: "Завтрак",
  },
  {
    name: "Закуски",
  },
  {
    name: "Коктейли",
  },
  {
    name: "Напитки",
  },
];
export const ingredients = [
  {
    id: 1,
    name: "Сырный бортик",
    price: 179,
    imageUrl: "/ingredients/Сырный_бортик.png",
  },
  {
    id: 2,
    name: "Сливочная моцарелла",
    price: 79,
    imageUrl: "/ingredients/Сливочная_моцарелла.png",
  },
  {
    id: 3,
    name: "Сыры чеддер и пармезан",
    price: 79,
    imageUrl: "/ingredients/Сливочная_моцарелла.png",
  },
  {
    id: 4,
    name: "Острый перец халапеньо",
    price: 59,
    imageUrl: "/ingredients/Острый_перец_халапеньо.png",
  },
  {
    id: 5,
    name: "Нежный цыпленок",
    price: 79,
    imageUrl: "/ingredients/Nezhny_cyplenok.jpg",
  },
  {
    id: 6,
    name: "Шампиньоны",
    price: 59,
    imageUrl: "/ingredients/шампиньоны.jpg",
  },
  {
    id: 7,
    name: "Ветчина",
    price: 79,
    imageUrl: "/ingredients/Ветчина.png",
  },
  {
    id: 8,
    name: "Пикантная пепперони",
    price: 79,
    imageUrl: "/ingredients/Пикантная_пепперони.png",
  },
  {
    id: 9,
    name: "Острая чоризо",
    price: 79,
    imageUrl: "/ingredients/Острая_чоризо.png",
  },
  {
    id: 10,
    name: "Маринованные огурчики",
    price: 59,
    imageUrl: "/ingredients/Маринованные_огурчики.png",
  },
  {
    id: 11,
    name: "Свежие томаты",
    price: 59,
    imageUrl: "/ingredients/Свежие_томаты.png",
  },
  {
    id: 12,
    name: "Красный лук",
    price: 59,
    imageUrl: "/ingredients/Красный_лук.png",
  },
  {
    id: 13,
    name: "Сочные ананасы",
    price: 59,
    imageUrl: "/ingredients/Сочные_ананасы.png",
  },
  {
    id: 14,
    name: "Итальянские травы",
    price: 39,
    imageUrl: "/ingredients/Итальянские_травы.png",
  },
  {
    id: 15,
    name: "Сладкий перец",
    price: 59,
    imageUrl: "/ingredients/Сладкий_перец.png",
  },
  {
    id: 16,
    name: "Кубики брынзы",
    price: 79,
    imageUrl: "/ingredients/Кубики_брынзы.png",
  },
  {
    id: 17,
    name: "Митболы",
    price: 79,
    imageUrl: "/ingredients/Митболы.png",
  },
];

export const products = [
  {
    name: "Омлет с ветчиной и грибами",
    imageUrl: "/products/Омлет_с_ветчиной_и_грибами.webp",
    categoryId: 2,
  },
  {
    name: "Омлет с пепперони",
    imageUrl: "/products/Омлет_с_пепперони.webp",
    categoryId: 2,
  },
  {
    name: "Кофе Латте",
    imageUrl: "/products/Кофе_Латте.webp",
    categoryId: 2,
  },
  {
    name: "Дэнвич ветчина и сыр",
    imageUrl: "/products/Дэнвич_ветчина_и_сыр.webp",
    categoryId: 3,
  },
  {
    name: "Куриные наггетсы",
    imageUrl: "/products/Куриные_наггетсы.webp",
    categoryId: 3,
  },
  {
    name: "Картофель из печи с соусом 🌱",
    imageUrl: "/products/Картофель_из_печи_с_соусом.webp",
    categoryId: 3,
  },
  {
    name: "Додстер",
    imageUrl: "/products/Додстер.webp",
    categoryId: 3,
  },
  {
    name: "Острый Додстер 🌶️🌶️",
    imageUrl: "/products/Острый_Додстер.webp",
    categoryId: 3,
  },
  {
    name: "Банановый молочный коктейль",
    imageUrl: "/products/Банановый_молочный_коктейль.webp",
    categoryId: 4,
  },
  {
    name: "Карамельное яблоко молочный коктейль",
    imageUrl: "/products/Карамельное_яблоко_молочный_коктейль.webp",
    categoryId: 4,
  },
  {
    name: "Молочный коктейль с печеньем Орео",
    imageUrl: "/products/Молочный_коктейль_с_печеньем_Орео.webp",
    categoryId: 4,
  },
  {
    name: "Классический молочный коктейль 👶",
    imageUrl: "/products/Классический_молочный_коктейль.webp",
    categoryId: 4,
  },
  {
    name: "Ирландский Капучино",
    imageUrl: "/products/Ирландский_Капучино.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Карамельный капучино",
    imageUrl: "/products/Кофе_Карамельный_капучино.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Кокосовый латте",
    imageUrl: "/products/Кофе_Кокосовый_латте.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Американо",
    imageUrl: "/products/Кофе_Американо.webp",
    categoryId: 5,
  },
  {
    name: "Кофе Латте",
    imageUrl: "/products/Кофе_Латте.webp",
    categoryId: 5,
  },
];

export const pizzaSizes = ["Маленькая", "Средняя", "Большая"];

export const pizzaSizeOptions = [
  { text: "20 см", value: "20", id: 1 },
  { text: "30 см", value: "30", id: 2 },
  { text: "40 см", value: "40", id: 3 },
];

export const pizzaTypes = [
  { text: "Тонкое", value: "1", id: 1 },
  { text: "Традиционное", value: "2", id: 2 },
];
