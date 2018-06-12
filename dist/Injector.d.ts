import { Constructor } from "./types";
export declare class Injector {
    private static injectables;
    private static resolved;
    static addInjectable(name: string, ctor: Constructor<any>): void;
    private static resolveRegistered;
    static resolve<T>(ctor: Constructor<any>): T;
}
