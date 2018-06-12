"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Injector_1 = require("./Injector");
class DIRouter {
    static registerRoute(route, controllerCtor) {
        if (!this.routes[controllerCtor.name]) {
            throw new Error("Tried to register a controller without any methods!");
        }
        this.routes[controllerCtor.name].ctor = controllerCtor;
        this.routes[controllerCtor.name].route = route;
    }
    static addMethod(controllerName, method, actionName) {
        this.routes[controllerName] = this.routes[controllerName] || {
            ctor: null,
            methods: {},
            route: ""
        };
        this.routes[controllerName].methods[method] = actionName;
    }
    static test(method, route) {
        for (var name in this.routes) {
            if (this.routes[name].route === route) {
                var controller = Injector_1.Injector.resolve(this.routes[name].ctor);
                controller[this.routes[name].methods[method]]();
            }
        }
    }
    static initRoutes() {
        var router = express_1.Router();
        for (var cName in this.routes) {
            var route = this.routes[cName].route;
            var controller = Injector_1.Injector.resolve(this.routes[cName].ctor);
            for (var method in this.routes[cName].methods) {
                var action = this.routes[cName].methods[method];
                router[method](route, controller[action]);
            }
        }
        return router;
    }
}
DIRouter.routes = {};
exports.DIRouter = DIRouter;
