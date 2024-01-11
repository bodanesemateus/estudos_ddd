import Address from "./domain/customer/entity/address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/order/entity/order";
import OrderItem from "./domain/order/entity/order_item";

let customer = new Customer('1', 'Mateus Bodanese');
let address = new Address('Rua 1', 123, '12345-123', 'Cidade 1');
customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10, 1, '1');
const item2 = new OrderItem('2', 'Item 2', 15, 2, '2');
const item3 = new OrderItem('3', 'Item 3', 20, 3, '3');

const order = new Order('1', '123', [item1, item2, item3]);