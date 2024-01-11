import EventHandlerInterface from "../../.shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.events";

export default class SendEmailWhenCustomerIsCreatedEventHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    
    handle(event: CustomerCreatedEvent): void {
        console.log(`This is the first event handler for CustomerCreatedEvent......`);
        console.log(`This is the second event handler for CustomerCreatedEvent......`);
    }

}