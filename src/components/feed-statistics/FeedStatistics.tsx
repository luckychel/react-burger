import styles from './FeedStatistics.module.css'
import { ReactNode } from 'react'
import { TOrder } from '../../utils/types'

export const FeedStatistics = () => {

  //const { orders, ordersQnty } = useAppSelector<any>(store => store);

  const orders: TOrder[] = [{
    _id: "111", 
    ingredients: [{
      "_id":"60666c42cc7b410027a1a9b1",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "proteins":80,
      "fat":24,
      "carbohydrates":53,
      "calories":420,
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b6",
      "name":"Биокотлета из марсианской Магнолии",
      "type":"main",
      "proteins":420,
      "fat":142,
      "carbohydrates":242,
      "calories":4242,
      "price":424,
      "image":"https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b8",
      "name":"Соус фирменный Space Sauce",
      "type":"sauce",
      "proteins":50,
      "fat":22,
      "carbohydrates":11,
      "calories":14,
      "price":80,
      "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
   }],
    owner: {
        name: "luckychel",
        email: "luckychel@yandex.ru",
        createdAt: "2024-05-14T14:00",
        updatedAt: "2024-05-14T14:00"
    },
    status: "done",
    name: "супер бургер",
    createdAt: "2024-05-14T14:00",
    updatedAt: "2024-05-14T14:00",
    number: 1231452,
    price: 882.12,
  },{
    _id: "2222", 
    ingredients: [{
      "_id":"60666c42cc7b410027a1a9b1",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "proteins":80,
      "fat":24,
      "carbohydrates":53,
      "calories":420,
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b6",
      "name":"Биокотлета из марсианской Магнолии",
      "type":"main",
      "proteins":420,
      "fat":142,
      "carbohydrates":242,
      "calories":4242,
      "price":424,
      "image":"https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b8",
      "name":"Соус фирменный Space Sauce",
      "type":"sauce",
      "proteins":50,
      "fat":22,
      "carbohydrates":11,
      "calories":14,
      "price":80,
      "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
   }],
    owner: {
        name: "luckychel",
        email: "luckychel@yandex.ru",
        createdAt: "2024-05-14T14:00",
        updatedAt: "2024-05-14T14:00"
    },
    status: "done",
    name: "супер бургер",
    createdAt: "2024-05-14T14:00",
    updatedAt: "2024-05-14T14:00",
    number: 89789789,
    price: 882.12,
  },
  {
    _id: "222", 
    ingredients: [{
      "_id":"60666c42cc7b410027a1a9b1",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "proteins":80,
      "fat":24,
      "carbohydrates":53,
      "calories":420,
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b6",
      "name":"Биокотлета из марсианской Магнолии",
      "type":"main",
      "proteins":420,
      "fat":142,
      "carbohydrates":242,
      "calories":4242,
      "price":424,
      "image":"https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b8",
      "name":"Соус фирменный Space Sauce",
      "type":"sauce",
      "proteins":50,
      "fat":22,
      "carbohydrates":11,
      "calories":14,
      "price":80,
      "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
   }],
    owner: {
        name: "luckychel",
        email: "luckychel@yandex.ru",
        createdAt: "2024-05-14T14:00",
        updatedAt: "2024-05-14T14:00"
    },
    status: "pending",
    name: "супер бургер",
    createdAt: "2024-05-14T14:00",
    updatedAt: "2024-05-14T14:00",
    number: 635634634,
    price: 882.12,
  },
  {
    _id: "333", 
    ingredients: [{
      "_id":"60666c42cc7b410027a1a9b1",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "proteins":80,
      "fat":24,
      "carbohydrates":53,
      "calories":420,
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b6",
      "name":"Биокотлета из марсианской Магнолии",
      "type":"main",
      "proteins":420,
      "fat":142,
      "carbohydrates":242,
      "calories":4242,
      "price":424,
      "image":"https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b8",
      "name":"Соус фирменный Space Sauce",
      "type":"sauce",
      "proteins":50,
      "fat":22,
      "carbohydrates":11,
      "calories":14,
      "price":80,
      "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
   }],
    owner: {
        name: "luckychel",
        email: "luckychel@yandex.ru",
        createdAt: "2024-05-14T14:00",
        updatedAt: "2024-05-14T14:00"
    },
    status: "pending",
    name: "супер бургер",
    createdAt: "2024-05-14T14:00",
    updatedAt: "2024-05-14T14:00",
    number: 1231452,
    price: 882.12,
  },
  {
    _id: "444", 
    ingredients: [{
      "_id":"60666c42cc7b410027a1a9b1",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "proteins":80,
      "fat":24,
      "carbohydrates":53,
      "calories":420,
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b6",
      "name":"Биокотлета из марсианской Магнолии",
      "type":"main",
      "proteins":420,
      "fat":142,
      "carbohydrates":242,
      "calories":4242,
      "price":424,
      "image":"https://code.s3.yandex.net/react/code/meat-01.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b7",
      "name":"Соус Spicy-X",
      "type":"sauce",
      "proteins":30,
      "fat":20,
      "carbohydrates":40,
      "calories":30,
      "price":90,
      "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b4",
      "name":"Мясо бессмертных моллюсков Protostomia",
      "type":"main",
      "proteins":433,
      "fat":244,
      "carbohydrates":33,
      "calories":420,
      "price":1337,
      "image":"https://code.s3.yandex.net/react/code/meat-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b9",
      "name":"Соус традиционный галактический",
      "type":"sauce",
      "proteins":42,
      "fat":24,
      "carbohydrates":42,
      "calories":99,
      "price":15,
      "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9b8",
      "name":"Соус фирменный Space Sauce",
      "type":"sauce",
      "proteins":50,
      "fat":22,
      "carbohydrates":11,
      "calories":14,
      "price":80,
      "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
   },
   {
      "_id":"60666c42cc7b410027a1a9bc",
      "name":"Плоды Фалленианского дерева",
      "type":"main",
      "proteins":20,
      "fat":5,
      "carbohydrates":55,
      "calories":77,
      "price":874,
      "image":"https://code.s3.yandex.net/react/code/sp_1.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
   }],
    owner: {
        name: "luckychel",
        email: "luckychel@yandex.ru",
        createdAt: "2024-05-14T14:00",
        updatedAt: "2024-05-14T14:00"
    },
    status: "pending",
    name: "супер бургер",
    createdAt: "2024-05-14T14:00",
    updatedAt: "2024-05-14T14:00",
    number: 161241,
    price: 882.12,
  }]

  const ordersQnty = {
    totalAll: 12345,
    totalToday: 67890
  }

  const ordersReady: TOrder[] = (orders as TOrder[])
    .filter((item) => item.status === 'done')
    .slice(0, 20)

  const ordersInWork: Array<TOrder> = (orders as TOrder[])
    .filter((item) => item.status !== 'done')
    .slice(0, 20)

  const ordersReadyList: ReactNode = ordersReady.map((item, index: number) => (
    <li
      className='text text_type_digits-default' key={index}>
      {item.number}
    </li>
  ))

  const ordersInWorkList: ReactNode = ordersInWork.map((item, index: number) => (
      <li className='text text_type_digits-default' key={index}>
        {item.number}
      </li>
    )
  )

  return (
    <div className={styles.feed_statistics_main_content}>
      <div className={styles.feed_statistics_table}>
        <div className={styles.feed_statistics_status}>
          <h2 className={`${'text text_type_main-medium'}`}>Готовы:</h2>
          <ul className={`${styles.feed_statistics_orders} ${styles.feed_statistics_orders_ready}`}>{ordersReadyList}</ul>
        </div>
        <div className={styles.feed_statistics_status}>
          <h2 className={`${'text text_type_main-medium'}`}>В работе:</h2>
          <ul className={`${styles.feed_statistics_orders} ${styles.feed_statistics_orders_in_work}`}>{ordersInWorkList}</ul>
        </div>
      </div>
      <div>
        <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
        <p className={`${'text text_type_digits-large'} ${styles.feed_statistics_orders_shadow}`}>{ordersQnty.totalAll}</p>
      </div>
      <div>
        <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
        <p className={`${'text text_type_digits-large'} ${styles.feed_statistics_orders_shadow}`}>{ordersQnty.totalToday}</p>
      </div>
    </div>
  )
}