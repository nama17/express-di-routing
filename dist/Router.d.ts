import { Router } from "express";
import { Constructor } from "./types";
export declare class DIRouter {
    private static routes;
    static registerRoute(route: string, controllerCtor: Constructor<any>): void;
    static addMethod(controllerName: string, method: string, actionName: string): void;
    static test(method: string, route: string): void;
    static initRoutes(): Router;
}
