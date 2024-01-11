import SendEmailWhenCustomerIsCreatedEventHandler from "../../../../customer/event/handler/send-email-when-customer-is-created.handler";
import EventDispatcher from "../../../../.shared/event/event-dispatcher";
import CustomerCreatedEvent from "../../../../customer/event/customer-created.events";

describe("Send email customer unit test", () => {

    it("should send email when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedEventHandler();

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
        const eventHandler = new SendEmailWhenCustomerIsCreatedEventHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(
          eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
        ).toBeUndefined();
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedEventHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers).toEqual({});
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("should notify an event", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedEventHandler();
        const spy = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        const constumerEvent = new CustomerCreatedEvent({ id: "i1",name: "Mateus"});

        eventDispatcher.notify(constumerEvent);

        expect(spy).toHaveBeenCalled();
    });

});