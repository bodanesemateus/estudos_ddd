import EventDispatcher from "../../../../.shared/event/event-dispatcher";
import SendEmailWhenCustomerAddresIsChange from "../send-email-when-address-is-change.handler";
import CustomerChangeEvent from "../../customer-change.events";


describe("Send email when change address unit test", () => {

    it("should send email when change address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerAddresIsChange();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        
        expect(
          eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
          1
        );
    });

    it("should unregister event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerAddresIsChange();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
        
        expect(
          eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerAddresIsChange();
        
        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers).toEqual({});
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("should notify an event", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerAddresIsChange();
        const spy = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("CustomerChangeEvent", eventHandler);
        
        const constumerEvent = new CustomerChangeEvent({ id: "i1",name: "Mateus", address: "Rua 1"});
        
        eventDispatcher.notify(constumerEvent);
        
        expect(spy).toHaveBeenCalled();
    }); 
});