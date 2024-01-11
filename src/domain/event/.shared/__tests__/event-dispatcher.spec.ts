import EventDispatcher from "../event-dispatcher";
import SendEmailWhenProductIsCreatedEventHandler from "../../product/handler/send-email-when-product-is-created.handler";
import SendEmailWhenCustomerIsCreatedEventHandler from "../../customer/handler/send-email-when-customer-is-created.handler";
import ProductCreatedEvent from "../../product/product-created.event";

describe("Domain events test", () => {
  
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedEventHandler();
    
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
    
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
          1
        );
        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

      });

      it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedEventHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
      });

      it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedEventHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
    
        expect(eventDispatcher.getEventHandlers).toEqual({});
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
      });

      it("should notify an event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedEventHandler();
        const spy = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
          eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({ name: "Product 1",
          description: "Product 1 description",
          price: 100, 
        });

        eventDispatcher.notify(productCreatedEvent);

        expect(spy).toHaveBeenCalled();
      });

});