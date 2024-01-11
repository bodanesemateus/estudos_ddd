import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../db/sequelize/model/customer.model";
import CustomerRepository from "../customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/entity/address";

describe('Customer Repository tests', () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('i1', "Customer 1");
        const address = new Address("street", 123 , "1233123", "Sao paulo");
        customer.Address = address;
        await customerRepository.create(customer);

        const customerCreated = await CustomerModel.findOne({ where: { id: 'i1' } });
        expect(customerCreated.toJSON()).toStrictEqual(customer.toJSON());
    });

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('i1', "Customer 1");
        const address = new Address("street", 123 , "1233123", "Sao paulo");
        customer.Address = address;
        customer.activate();

        await customerRepository.create(customer);

        const address2 = new Address("street2", 123 , "1233123", "Sao paulo");
        customer.changeName('Customer 2');
        customer.changeAddress(address2);

        await customerRepository.update(customer);

        const customerUpdated = await CustomerModel.findOne({ where: { id: 'i1' } });
        expect(customerUpdated.toJSON()).toStrictEqual(customer.toJSON());
    });

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('i1', "Customer 1");
        const address = new Address("street", 123 , "1233123", "Sao paulo");
        customer.Address = address;

        await customerRepository.create(customer);

        const customerResult = await customerRepository.find(customer.id);
        
        expect(customer).toStrictEqual(customerResult);
    });

    it("should throw an error when customer doesn't exist", async () => {
        const customerRepository = new CustomerRepository();
        
        expect(async () => {
            await customerRepository.find('i3213121');
        }).rejects.toThrowError('Customer not found');
    });

    it('should find all customers', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('i1', "Customer 1");
        const address = new Address("street", 123 , "1233123", "Sao paulo");
        customer.Address = address;
        customer.addRewardPoints(10);

        const customer2 = new Customer('i2', "Customer 2");
        const address2 = new Address("street2", 123 , "1233123", "Sao paulo");
        customer2.Address = address2;
        customer2.addRewardPoints(20);

        await customerRepository.create(customer);
        await customerRepository.create(customer2);

        const customerResult = await customerRepository.findAll();

        expect(customerResult).toHaveLength(2);
        expect(customerResult).toContainEqual(customer);
        expect(customerResult).toContainEqual(customer2);
    });



});