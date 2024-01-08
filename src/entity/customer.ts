import Address from "./address";

// uma entidade SEMPRE deve ser autovalidável, garantindo que ela sempre estará em um estado válido

// ORM foca em persistência de dados, não em regras de negócio

// regra de negócio fica na entidade

// de resumo, voce tem uma entidade que e para regra de negocio 
// e uma entidade que e para persistencia de dados

// nunca, jamais, trate regra de negócio na entidade de persistência de dados

// por mais que todos os campos sejam alteraveis, sempre trate em dois arquivos diferentes

// domain
   // entities
      // customer.ts
         // aqui se resolve regra de negócio

// infra 
   // db
      // model
         // customer.ts
            // aqui tem get e set e armazena no banco de dados

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._active = true;
    }

    validate() {
        if (!this._id || this._id.length === 0) {
            throw new Error('Invalid id');
        }
     
        if (!this._name || this._name.length === 0 || this._name.length < 3) {
            throw new Error('Invalid name');
        }

        if (!this._address || this._address === undefined) {
            throw new Error('Invalid address');
        }

    }

    changeName(newName: string) {
        this._name = newName;
        this.validate();
    }

    set address(address: Address) {
        this._address = address;
    }

    deactivate() {
        this._active = false;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Address is required to activate customer');
        } 
        this._active = true;
        this.validate();
    }

}