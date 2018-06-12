import { Constructor } from "./types";

export class Injector {
    private static injectables: {[name: string]: Constructor<any>} = {};
    private static resolved: {[name: string]: any} = {};

    public static addInjectable(name: string, ctor: Constructor<any>): void {
        this.injectables[name] = ctor;
    }

    private static resolveRegistered(name: string): any {
        if (this.resolved[name]) {
            return this.resolved[name];
        }
        if (!this.injectables[name]) {
            throw new Error(`Can't resolve type '${name}'. Is this type registered?`);
        }
        var metadata: any[] = Reflect.getMetadata('design:paramtypes', this.injectables[name]);
        var params: any[] = [];
        if (Array.isArray(metadata)) {
            for (var data of metadata) {
                var sName: string = data.name;
                params.push(this.resolveRegistered(sName));
            }
        }
        var instance: any = new this.injectables[name](...params);
        this.resolved[name] = instance;
        return instance;
    }

    public static resolve<T>(ctor: Constructor<any>): T {
        var metadata: any[] = Reflect.getMetadata('design:paramtypes', ctor);
        var params: any[] = [];
        if (Array.isArray(metadata)) {
            for (var data of metadata) {
                var sName: string = data.name;
                params.push(this.resolveRegistered(sName));
            }
        }
        var instance: any = new ctor(...params);
        return instance;
    }
}