export interface Goods {
  id?: string;
  name: string;
  price: string;
  store: string;
  deliver: boolean;
  back7day: boolean;
  baitiaoPay: boolean;
  serviceSupport: Array<string> | string;
  brand: string;
  no: string;
  weight: string;
  ingradient: string;
  approperate: string;
  sold: number;
  region: string;
  specification: string;
  tags: string[] | string;
  keywords: string[] | string;
  thumbs: string[] | string;
  owner: string;
  cartCount: number;
  order?: string;
  publisher: {
    username: string;
    role: string;
  };
  desc: string[] | string;
  jdStore: boolean;
}
