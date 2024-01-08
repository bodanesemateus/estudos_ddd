import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer('1', 'Mateus Bodanese');
let address = new Address('Rua 1', 123, '12345-123', 'Cidade 1');
customer.address = address;
customer.activate();

const item1 = new OrderItem('1', 'Item 1', 10);
const item2 = new OrderItem('2', 'Item 2', 15);
const item3 = new OrderItem('3', 'Item 3', 20);

const order = new Order('1', '123', [item1, item2, item3]);