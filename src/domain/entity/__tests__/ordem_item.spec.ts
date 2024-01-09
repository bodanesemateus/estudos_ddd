import OrderItem from "../order_item";

describe("Order_item unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order_item = new OrderItem("", "123", 10, 10, "123");
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let order_item = new OrderItem("123", "", 10, 10, "1");
        }).toThrowError("Name is required");
    });

    it("should throw error when price is empty", () => {
        expect(() => {
            let order_item = new OrderItem("123", "123", -1, 10, "123");
        }).toThrowError("Price must be greater than 0");
    });

    it("should return total ordem_item", () => {
        expect(() => {
            let order_item = new OrderItem("123", "123", 10, 10, "123");
            
            expect(order_item.ordemItemTotal()).toBe(100);
        }
        ).not.toThrowError();
    });

    it("should throw error if the item quantity is greater than 0", () => {
    
        expect(() => {
            const ordem_item = new OrderItem("123", "123", 10, 0, "123");
        }).toThrowError("Quantity must be greater than 0");

        expect(() => {
            const ordem_item = new OrderItem("123", "123", 10,-10, "123");
        }).toThrowError("Quantity must be greater than 0");

    });

    it("should return quantity", () => {
        expect(() => {
            let order_item = new OrderItem("123", "123", 10, 10, "123");
            
            expect(order_item.quantity).toBe(10);
        }
        ).not.toThrowError();
    });

    it("should return price", () => {
        expect(() => {
            let order_item = new OrderItem("123", "123", 10, 10, "123");
            
            expect(order_item.price).toBe(10);
        }
        ).not.toThrowError();
    });

    it("throw error when _productId is empty", () => {
        expect(() => {
            let order_item = new OrderItem("123", "123", 10, 10, "");
        }).toThrowError("ProductId is required");
    });
});