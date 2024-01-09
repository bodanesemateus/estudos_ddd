export default class Address {
    
    _street: string = "";
    _number: number = 0;
    _zipCode: string = "";
    _city: string   = "";
    
    constructor( street: string, number: number, zipCode: string, city: string,) {
        this._street = street;
        this._number = number;
        this._zipCode = zipCode;
        this._city = city;
    }

    validate() {
        if (!this._street || this._street.length === 0) {
            throw new Error('Invalid street');
        }
     
        if (!this._number || this._number === 0) {
            throw new Error('Invalid number');
        }

        if (!this._city || this._city.length === 0) {
            throw new Error('Invalid city');
        }

        if (!this._zipCode || this._zipCode.length === 0) {
            throw new Error('Invalid zip code');
        }

    }

    changeStreet(newStreet: string) {
        this._street = newStreet;
        this.validate();
    }

    changeNumber(newNumber: number) {
        this._number = newNumber;
        this.validate();
    }

    changeCity(newCity: string) {
        this._city = newCity;
        this.validate();
    }

    changeZipCode(newZipCode: string) {
        this._zipCode = newZipCode;
        this.validate();
    }

    toString() {
        return `${this._street}, ${this._number} - ${this._zipCode} - ${this._city}`;
    }

    toStringBraszil() {
        return ` Rua ${this._street}, Numero ${this._number} - Cidade ${this._city} - CEP ${this._zipCode}`;
    }
}