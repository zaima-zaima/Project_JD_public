export interface Deliver {
  id?: string;
  user: string;
  province: {
    name: string;
    id: string;
  };
  city: {
    name: string;
    id: string;
  };
  area: {
    name: string;
    id: string;
  };
  detail: string;
  name: string;
  phone: string;
  default: boolean;
}

export interface DeliverSelectedItem {
  name: string;
  id: string;
}

export interface DeliverSelected {
  province: DeliverSelectedItem;
  city: DeliverSelectedItem;
  area: DeliverSelectedItem;
}
