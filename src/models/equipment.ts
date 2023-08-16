import { Item } from "./item";

export interface Equipment {
    item: Item;
    quantity: number;
    equipped: boolean;
}
