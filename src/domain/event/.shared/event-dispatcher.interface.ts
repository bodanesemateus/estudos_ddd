import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {

    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: Function): void;
    unregister(eventName: string, eventHandler: Function): void;
    unregisterAll(): void;

}