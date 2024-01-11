import Address from "../../value-object/address";
import CustomerFactory from "../customer.factory";

describe('CustomerFactory unit tests', () => {

    it('should create a customer', () => {
        const customer = CustomerFactory.create('John');

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John');
        expect(customer.Address).toBeUndefined();

    });

    it('should create a customer with address', () => {
        const address = new Address('Street 1', 12345-123, 'City', 'Country');    
        const customer = CustomerFactory.createWithAddress('John', address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John');
        expect(customer.Address).toEqual(address);
    
    });

});