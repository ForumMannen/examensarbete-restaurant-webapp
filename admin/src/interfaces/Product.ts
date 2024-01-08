import { IAddon } from "./Addon";

export interface IProduct {
    title: string;
    addons: IAddon[];
    image: string;
    price: number;
}