import Address from "../../value-object/address";
import Customer from "../customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
      expect(() => {
        let customer = new Customer("", "John");
      }).toThrowError("Id is required");
    });
  
    it("should throw error when name is empty", () => {
      expect(() => {
        let customer = new Customer("123", "");
      }).toThrowError("Name is required");
    });

    it("should change name", () => {
        //arange
        const customer = new Customer("123", "John");
        //act
        customer.changeName("John Doe");
        //assert
        expect(customer.name).toBe("John Doe");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "John");

        const address = new Address("street", 123 , "1233123", "Sao paulo");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should desactivate customer", () => {
        const customer = new Customer("123", "John");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should thowr error when activate customer with adress empty", () => {
        expect(() => {
            const customer = new Customer("123", "John");
             customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
});