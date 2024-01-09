import Order from "../../entity/order";
import OrderItem from "../../entity/order_item";
import OrderService from "../order.service";

describe('OrderService unit tests', () => {

    it("shlould get total of all order", () => {
        const item = new OrderItem("1", "Item 1", 1, 1, "1");
        const item2 = new OrderItem("2", "Item 2", 2, 2, "2");
        const item3 = new OrderItem("3", "Item 3", 3, 3, "3");
        const items = [item, item2, item3];

        const order = new Order("1", "c1" , [item]);
        const order2 = new Order("2", "c2" , [item2]);
        const order3 = new Order("3", "c3" , [item3]);

        const total = OrderService.getTotal([order, order2, order3]);

    });

});