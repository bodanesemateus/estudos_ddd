import EventHandlerInterface from "../../../.shared/event/event-handler.interface";
import CustomerChangeEvent from "../customer-change.events";;

export default class SendEmailWhenCustomerAddresIsChange implements EventHandlerInterface<CustomerChangeEvent> {
    
    handle(event: CustomerChangeEvent): void {
        console.log(`Address is changed for customer with id ${event.customerId}, name ${event.customerName}, new address is ${event.address}`);
    }

}