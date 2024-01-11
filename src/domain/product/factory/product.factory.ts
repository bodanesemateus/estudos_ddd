import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";
import ProductB from "../entity/product-b";

export default class ProductFactory {
    public static create(type: string, name: string, price: number): ProductInterface {
        
        const id = uuid();

        switch (type) {
            case 'a':
                return new Product(id, name, price);
            case 'b':
                return new ProductB(id, name, price);
            default:
                throw new Error('Invalid product type');
        }

    }
}