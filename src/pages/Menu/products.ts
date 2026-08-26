import { IProduct } from '../../interfaces/product.interface';

export const menuProducts: IProduct[] = [
  {
    id: 1,
    name: 'Наслаждение',
    price: 300,
    ingredients: ['салями', 'руккола', 'помидоры', 'оливки'],
    image: 'food1.png',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Такос',
    price: 280,
    ingredients: ['острый перец', 'лепёшка', 'фарш'],
    image: 'food2.png',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Аццки острая',
    price: 320,
    ingredients: ['острый соус', 'грибы', 'помидоры', 'оливки'],
    image: 'food3.png',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Жаркое с сыром',
    price: 290,
    ingredients: ['картофель', 'сыр', 'перец', 'фарш'],
    image: 'food4.png',
    rating: 4.4,
  },
  {
    id: 5,
    name: 'Цезарь с курицей',
    price: 290,
    ingredients: ['курица', 'сыр', 'соус Цезарь', 'помидоры'],
    image: 'food5.png',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Зелёный салат',
    price: 290,
    ingredients: ['огурец', 'орехи', 'перец'],
    image: 'food6.png',
    rating: 4.5,
  },
];
