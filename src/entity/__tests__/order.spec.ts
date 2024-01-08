import Order from "../order";
import OrderItem from "../order_item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });

    it("should throw error when items is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items is are required");
    });

    it("should return total", () => {
        expect(() => {
            let order = new Order("123", "123", [
                new OrderItem("123", "123", 10),
                new OrderItem("123", "123", 20),
                new OrderItem("123", "123", 30)
            ]);

            expect(order.total()).toBe(60);
        }
        ).not.toThrowError();
    });

    it("should calculate total", () => {
        const item = new OrderItem("Item 1", "Item", 100);
        const item2 = new OrderItem("Item 2", "Item", 200);
        const order = new Order("123", "123", [item]);

        let total = order.total();

        expect(total).toBe(100);

        const order2 = new Order("123", "123", [item, item2]);
        total = order2.total();
        expect(total).toBe(300);
    });
});