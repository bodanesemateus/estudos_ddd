import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infra/db/sequelize/model/product.model";
import Product from "../../entity/product";
import ProductRepository from "../../../../infra/repository/product.repository";

describe('ProductRepository tests', () => { 
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a product', async () => {
        // const product = await ProductModel.create({
        //     name: 'Product 1',
        //     price: 10,
        // });

        // expect(product.id).toBeTruthy();
        // expect(product.name).toBe('Product 1');
        // expect(product.price).toBe(10);

        const productRepository = new ProductRepository();
        const product = new Product('i1', "Product 1", 10);
        
        await productRepository.create(product);
        
        const productCreated = await ProductModel.findOne({ where: { id: 'i1' } });
        expect(productCreated.toJSON()).toStrictEqual(product.toJSON());
    });

    it('should update a product', async () => {
        const product = new Product('i1', "Product 1", 10);

        const productRepository = new ProductRepository();

        await productRepository.create(product);

        product.changeName('Product 2');
        product.changePrice(20);

        await productRepository.update(product);

        const productUpdated = await ProductModel.findOne({ where: { id: 'i1' } });
        expect(productUpdated.toJSON()).toStrictEqual(product.toJSON());
    });

    it('should find all products', async () => {
        const product1 = new Product('i1', "Product 1", 10);
        const product2 = new Product('i2', "Product 2", 20);

        const productRepository = new ProductRepository();

        await productRepository.create(product1);
        await productRepository.create(product2);

        const productsFound = await productRepository.findAll();
        const products = [product1, product2];

        expect(products.length).toBe(2);
        expect(products).toEqual(productsFound);
    });

    it('should find a product', async () => {
        const productRepository = new ProductRepository();

        const product = new Product('i1', "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: 'i1' } });

        const productFound = await productRepository.find('i1');

        expect(productModel.toJSON()).toStrictEqual(productFound.toJSON());
    });


});