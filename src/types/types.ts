export type UserData = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  phone: string;
  address: string;
  password: string;
  isAdmin: boolean;
  isBanned: boolean;
};

export type Product = {
  _id: string;
  id: number;
  title: string;
  slug: string;
  image: null;
  description: string;
  category: object[];
  quantity: number;
  sold: number;
  shipping: number;
  price: number;
};
