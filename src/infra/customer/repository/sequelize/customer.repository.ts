import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer) {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });
    }
    async update(entity: Customer) {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipCode: entity.Address.zipCode,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        }, 
        { 
            where: { 
                id: entity.id 
            } 
        });
    }
    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll();
        const customers = customersModel.map(customerModel => {
            let customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            const address = new Address(
                customerModel.street, 
                customerModel.number, 
                customerModel.zipCode, 
                customerModel.city
            );
            customer.changeAddress(address);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({ 
                where: { 
                    id, 
                }, 
                rejectOnEmpty: true, 
            });
        } catch (error) {
            throw new Error("Customer not found");
        } 

        const customer = new Customer(id, customerModel.name);
        const address = new Address(
            customerModel.street, 
            customerModel.number, 
            customerModel.zipCode, 
            customerModel.city
        );

        customer.changeAddress(address);
        return customer;
    }
}