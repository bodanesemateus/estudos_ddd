import Order from "../../domain/order/entity/order";
import OrderItem from "../../domain/order/entity/order_item";
import OrderRepositoryInterface from "../../domain/order/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void>{
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                product_id: item.productId
            }))
        },
        {
            include: [{ model: OrderItemModel , as: "items"}]
        }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total()
        }, 
        {
            where: { id: entity.id }
        }
        );
        
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction: t }
            );
        });
    }

    async find(id: string): Promise<Order> {

        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id
                },
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        let itemsModel;
        try {
            itemsModel = await OrderItemModel.findAll({
                where: {
                    order_id: id
                }
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        const order = new Order(id, orderModel.customer_id, itemsModel.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id);
        }));

        return order;
        
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({
            include: ["items"]
        });
        return orders.map((order) => new Order(order.id, order.customer_id, order.items.map(item => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id);
        })));
    }

}