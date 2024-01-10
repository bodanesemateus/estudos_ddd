import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../db/sequelize/model/order.model";
import CustomerModel from "../../db/sequelize/model/customer.model";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import ProductModel from "../../db/sequelize/model/product.model";
import CustomerRepository from "../customer.repository";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";
import ProductRepository from "../product.repository";
import Product from "../../../domain/entity/product";
import OrderRepository from "../order.repository";
import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";

describe('Order Repository tests', () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a new order', async () => {
        // cria cliente
        const customerRepository = new CustomerRepository();
        const customer = new Customer('i1', "Customer 1");
        const address = new Address("street", 123 , "1233123", "Sao paulo");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        // cria produto
        const productRepository = new ProductRepository();
        const product = new Product('p1', "Product 1", 10);
        await productRepository.create(product);

        // cria item
        const ordemItem = new OrderItem('i1', product.name, product.price, 1, product.id );

        // cria pedido
        const order = new Order('i1', 'i1', [ordemItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ 
            where: { id: order.id },
            include: ["items"] 
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: 'i1',
            customerId: 'i1',
            items: [{
                id: 'i1',
                name: 'Product 1',
                price: 10,
                quantity: 1,
                productId: 'p1',
                orderId: 'i1',
            }]
        });

    });
});