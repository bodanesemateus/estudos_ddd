import EventInterface from '../../.shared/event.interface';

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;
 
    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
        this.eventData.customerId = this.eventData.id;
        this.eventData.customerName = this.eventData.name;
        this.eventData.address = this.eventData.address;
    }

    get customerId(): string {
        return this.eventData.customerId;
    }

    get customerName(): string {
        return this.eventData.customerName;
    }

    get address(): string {
        return this.eventData.address;
    }

}