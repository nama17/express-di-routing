import { Constructor } from "./types";
export declare function Get(target: any, method: string): void;
export declare function Post(target: any, method: string): void;
export declare function Delete(target: any, method: string): void;
export declare function Put(target: any, method: string): void;
export declare function Service(ctor: Constructor<any>): void;
export declare function Controller(route: string): (ctor: Function) => void;
