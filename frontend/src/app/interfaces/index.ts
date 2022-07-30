export interface Item {
  id: number;
  item_name: string;
  income_date: string;
  quantity: number;
  producer: Producer;
  description: string;
  photo_src: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: number;
  ordered_quantity: string;
  Item: Item;
  createdAt: Date;
  updatedAt: Date;
}
export interface ExportItem {
  id: number;
  ordered_quantity: string;
  Item: Item;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImportOrder {
  id: number;
  special_id: number;
  order_name: string;
  income_date: string;
  RegistrationModels: RegistrationModel[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ExportOrder {
  id: number;
  special_id: number;
  order_name: string;
  income_date: string;
  RegistrationModels: RegistrationModel[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Producer {
  id: number;
  producer_name: string;
  phone1: string;
  phone2: string;
  description: string;
  photo_src: string;
  Items: Item[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrationModel {
  id: number;
  ritem_name: string;
  ordered_quantity: number;
  ritem_quantity: number;
  ritem_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  user_position: string;
  phone1: string;
  phone2: string;
  photo_src: string;
  user_login: string;
  user_password: string;
  user_role: string;
  createdAt: Date;
  updatedAt: Date;
}
