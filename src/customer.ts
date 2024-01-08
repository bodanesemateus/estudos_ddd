class Customer {
    _id: string;
    _name: string;
    _address: string;
    _active: boolean;

    constructor(id: string, name: string, address: string) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._active = true;
    }

    changeName(newName: string) {
        this._name = newName;
    }

    changeAddress(newAddress: string) {
        this._address = newAddress;
    }

    deactivate() {
        this._active = false;
    }

    activate() {
        this._active = true;
    }

}