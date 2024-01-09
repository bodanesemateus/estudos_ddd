import Product from "../entity/product";
import RepositoryInterface from "./repository-interface";


// aqui criamos os metodos especificos de produtos, ou seja, se eu preciso procurar um produto
// pela data de criacaom eu crio um metodo aqui, se eu preciso procurar um produto pelo nome, 
// eu crio um metodo aqui
// agora se eu preciso criar um produto, eu uso a classe generica RepositoryInterface
export default interface ProductRepositoryInterface extends RepositoryInterface<Product> { 

}