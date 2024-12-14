import axios from "axios";

const api = axios.create({
  baseURL: "http://stageapi.monkcommerce.app",
  headers: {
    "x-api-key": "72njgfa948d9aS7gs5",
  },
});

export const fetchProducts = async (search, page, limit) => {
  const res = await api.get(`/task/products/search`, {
    params: { search, page, limit },
  });
  return res.data || eg;
};

export const eg = [
  {
    id: 77,
    title: "Fog Linen Chambray Towel - Beige Stripe",
    variants: [
      {
        id: 1,
        product_id: 77,
        title: "XS / Silver",
        price: "49",
      },
      {
        id: 2,
        product_id: 77,
        title: "S / Silver",
        price: "49",
      },
      {
        id: 3,
        product_id: 77,
        title: "M / Silver",
        price: "49",
      },
    ],
    image: {
      id: 266,
      product_id: 77,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
    },
  },
  {
    id: 80,
    title: "Orbit Terrarium - Large",
    variants: [
      {
        id: 64,
        product_id: 80,
        title: "Default Title",
        price: "109",
      },
    ],
    image: {
      id: 272,
      product_id: 80,
      src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
    },
  },
];
