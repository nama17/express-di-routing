import { Router } from "express";
import { Injector } from "./Injector";
import { Constructor } from "./types";

export class DIRouter {
    private static routes: Routes = {};
    
    public static registerRoute(route: string, controllerCtor: Constructor<any>): void {
        if (!this.routes[controllerCtor.name]) {
            throw new Error("Tried to register a controller without any methods!");
        }
        this.routes[controllerCtor.name].ctor = controllerCtor;
        this.routes[controllerCtor.name].route = route;
    }

    public static addMethod(controllerName: string, method: string, actionName: string): void {
        this.routes[controllerName] = this.routes[controllerName] || {
            ctor: null,
            methods: {},
            route: ""
        };
        this.routes[controllerName].methods[method] = actionName;
    }

    public static test(method: string, route: string): void {
        for (var name in this.routes) {
            if (this.routes[name].route === route) {
                var controller = Injector.resolve(this.routes[name].ctor);
                controller[this.routes[name].methods[method]]();
            }
        }
    }

    public static initRoutes(): Router {
        var router: Router = Router();
        for (var cName in this.routes) {
            var route: string = this.routes[cName].route;
            var controller: any = Injector.resolve(this.routes[cName].ctor);
            for (var method in this.routes[cName].methods) {
                var action: string = this.routes[cName].methods[method];
                router[method](route, controller[action]);
            }
        }
        return router;
    }
}

interface Routes {
    [controllerName: string]: {
        route: string,
        ctor: Constructor<any>,
        methods: {
            [methodName: string]: string
        }
    }
}