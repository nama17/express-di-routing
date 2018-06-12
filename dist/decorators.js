"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Router");
const Injector_1 = require("./Injector");
function Get(target, method) {
    Router_1.DIRouter.addMethod(target.constructor.name, "get", method);
}
exports.Get = Get;
function Post(target, method) {
    Router_1.DIRouter.addMethod(target.constructor.name, "post", method);
}
exports.Post = Post;
function Delete(target, method) {
    Router_1.DIRouter.addMethod(target.constructor.name, "delete", method);
}
exports.Delete = Delete;
function Put(target, method) {
    Router_1.DIRouter.addMethod(target.constructor.name, "put", method);
}
exports.Put = Put;
function Service(ctor) {
    Injector_1.Injector.addInjectable(ctor.name, ctor);
}
exports.Service = Service;
function Controller(route) {
    return (ctor) => {
        Router_1.DIRouter.registerRoute(route, ctor);
    };
}
exports.Controller = Controller;
