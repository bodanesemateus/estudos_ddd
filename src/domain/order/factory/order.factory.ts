import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryprops {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        price: number;
        quantity: number;
        productId: string;
    }[]
}


export default class OrderFactory {
    public static create(props: OrderFactoryprops): Order {
        const orderItem = props.items.map(item => new OrderItem(
            item.id, 
            item.name, 
            item.price, 
            item.quantity, 
            item.productId));
        
        return new Order(props.id, props.customerId, orderItem);
        
    }
}