import EventHandlerInterface from "../../../.shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

export default class SendEmailWhenCustomerAddresIsChange implements EventHandlerInterface<CustomerCreatedEvent> {
    
    handle(event: CustomerCreatedEvent): void {
        console.log(`Address is changed for customer with id ${event.customerId}, name ${event.customerName}, new address is ${event.address}`);
    }

}