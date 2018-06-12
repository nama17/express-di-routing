import { DIRouter as Router } from "./Router";
import { Injector } from "./Injector";
import { Constructor } from "./types";

export function Get(target: any, method: string): void {
    Router.addMethod(target.constructor.name, "get", method);
}

export function Post(target: any, method: string): void {
    Router.addMethod(target.constructor.name, "post", method);
}

export function Delete(target: any, method: string): void {
    Router.addMethod(target.constructor.name, "delete", method);
}

export function Put(target: any, method: string): void {
    Router.addMethod(target.constructor.name, "put", method);
}

export function Service(ctor: Constructor<any>): void {
    Injector.addInjectable(ctor.name, ctor);
}

export function Controller(route: string): (ctor: Function) => void {
    return (ctor: Constructor<any>) => {
        Router.registerRoute(route, ctor);
    };
}
