import {v4 as uuid} from 'uuid';
import OrderFactory from '../order.factory';

describe('OrderFactory unit tests', () => {

    it('should create an order', () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: 'Product 1',
                    price: 10,
                    quantity: 1,
                    productId: uuid(),
                },
                {
                    id: uuid(),
                    name: 'Product 2',
                    price: 20,
                    quantity: 2,
                    productId: uuid(),
                },
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(2);

    });

});