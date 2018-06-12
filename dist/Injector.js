"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Injector {
    static addInjectable(name, ctor) {
        this.injectables[name] = ctor;
    }
    static resolveRegistered(name) {
        if (this.resolved[name]) {
            return this.resolved[name];
        }
        if (!this.injectables[name]) {
            throw new Error(`Can't resolve type '${name}'. Is this type registered?`);
        }
        var metadata = Reflect.getMetadata('design:paramtypes', this.injectables[name]);
        var params = [];
        if (Array.isArray(metadata)) {
            for (var data of metadata) {
                var sName = data.name;
                params.push(this.resolveRegistered(sName));
            }
        }
        var instance = new this.injectables[name](...params);
        this.resolved[name] = instance;
        return instance;
    }
    static resolve(ctor) {
        var metadata = Reflect.getMetadata('design:paramtypes', ctor);
        var params = [];
        if (Array.isArray(metadata)) {
            for (var data of metadata) {
                var sName = data.name;
                params.push(this.resolveRegistered(sName));
            }
        }
        var instance = new ctor(...params);
        return instance;
    }
}
Injector.injectables = {};
Injector.resolved = {};
exports.Injector = Injector;
