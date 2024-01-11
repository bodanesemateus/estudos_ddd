import ProductCreatedEvent from "../product-created.event";
import EventHandlerInterface from "../../../.shared/event-handler.interface";

export default class SendEmailWhenProductIsCreatedEventHandler implements EventHandlerInterface<ProductCreatedEvent> {
    
    handle(event: ProductCreatedEvent): void {
        console.log(`Send email when product is created......`);
    }

}