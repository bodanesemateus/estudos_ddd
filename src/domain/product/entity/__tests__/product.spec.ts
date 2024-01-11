import Product from "../product";


describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 10);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 10);
        }).toThrowError("Name is required");
    });
    
    it("should throw error when price is empty", () => {
        expect(() => {
            let product = new Product("1", "Name", -1);
        }).toThrowError("Price must be greater than 0");
    });

    it("should change name", () => {
        let product = new Product("1", "Product 1", 10);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        let product = new Product("1", "Product 1", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });

});