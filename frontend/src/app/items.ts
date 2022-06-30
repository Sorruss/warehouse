import { Item } from './interfaces';

const description =
  'Сам біль – це любов, головна система зберігання. Якщо захворювання термічні проблеми. \
  Ніякої компенсації за чисті проблеми. Найбільший страх Але в самого автора пором не є подобу активу, \
  мучителя Ход було сказано просто, щоб члени кота злякалися. Мецена fringilla pellentesque metus, eu \
  porttitor tellus. Білок до того, як кішка закінчиться, білок включено. На жаль, є багато футболу, який \
  можна застосувати на практиці. Phasellus nec Tellus зараз. Клас придатний taciti sociosqu ad litora \
  torquent per conubia nostra, per inceptos himenaeos До першого активу транспортний засіб не має \
  термічного макіяжу, діам транспортний засіб — це білок мудрих, з краю лука, це потрібно левові. Але \
  озеро життя – це завжди результат вихідного дня, який стає горлом кота.';
const photoSrc = '../static/images/4-9.jpg';

export const items: Item[] = [
  {
    id: 0,
    name: 'ноутбук',
    quantity: 213,
    date: '21.01.2022',
    producer: 'Microsoft',
    description,
    photoSrc,
  },
  {
    id: 1,
    name: 'книжка',
    quantity: 123,
    date: '24.06.2022',
    producer: 'Твій Світ',
    description,
    photoSrc,
  },
  {
    id: 2,
    name: 'телефон',
    quantity: 1233,
    date: '25.08.2022',
    producer: 'Xiomi',
    description,
    photoSrc,
  },
  {
    id: 3,
    name: 'склянка',
    quantity: 522,
    date: '22.02.2022',
    producer: 'УкрСкло',
    description,
    photoSrc,
  },
];
