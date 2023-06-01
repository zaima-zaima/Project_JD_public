import { Goods } from "./Goods";

export default interface Cart {
  cartCount: number;
  id?: string;
  name: string;
  price: string;
  store: string;
  deliver: boolean;
  back7day: boolean;
  baitiaoPay: boolean;
  serviceSupport: string[];
  brand: string;
  no: string;
  weight: string;
  ingradient: string;
  approperate: string;
  region: string;
  specification: string;
  keywords: string[];
  tags: string[];
  thumbs: string[];
  desc: string[];
  sold: number;
  selected: boolean;
}
