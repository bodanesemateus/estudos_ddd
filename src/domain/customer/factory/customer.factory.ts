import { v4 as uuid } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {

    public static create(name: string): Customer {
        const id = uuid();
        return new Customer(id, name);
    }

    public static createWithAddress(name: string, address: Address): Customer {
        const id = uuid();
        const customer = new Customer(id, name);
        customer.Address = address;
        return customer;
    }

}