import { Order } from "sequelize";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order){
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            orderItems: entity.orderItems
        })
    }
    update(entity: Order): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }

}