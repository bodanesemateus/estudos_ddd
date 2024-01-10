import EventDispatcher from "../event-dispatcher";
import SendEmailWhenProductIsCreatedEventHandler from "../../product/handler/send-email-when-product-is-created.handler";

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

});