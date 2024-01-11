import Address from "../value-object/address";

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
    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }
    
    changeAddress(address: Address) {
        this._address = address;
    }

    isActive(): boolean {
        return this._active;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    toJSON() {
        return {
            id: this._id,
            name: this._name,
            active: this._active,
            rewardPoints: this._rewardPoints,
            street: this._address.street,
            number: this._address.number,
            zipCode: this._address.zipCode,
            city: this._address.city

        };
    }

    set Address(address: Address) {
        this._address = address;
    }
}