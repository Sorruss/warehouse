export interface Item {
  id: number;
  name: string;
  date: string;
  quantity: number;
  producer: string;
  description: string;
  photoSrc: string;
}

export interface IImportRegistrationElem {
  [id: number]: IImportRegistrationCont;
}

export interface IImportRegistrationCont {
  id: number;
  name: string;
  date: string;
  items: (Item & { orderedQuantity?: number })[];
}

export interface IExportRegistrationElem {
  [id: number]: IExportRegistrationCont;
}

export interface IExportRegistrationCont {
  id: number;
  name: string;
  date: string;
  items: (Item & { orderedQuantity?: number })[];
}

export interface IExportItem {
  [id: number]: Item & { orderedQuantity: number };
}

export interface ICartItem {
  [id: number]: Item & { orderedQuantity: number };
}
