/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import {TCPTransport} from "./tcptransport";
import * as url from "url";
import {UrlObject} from "url";


export interface ErrorCallback {
    (error: Error): void;
}

export interface DataCallback {
    (buffer: Buffer): void;
}

export interface Callback {
    () : void;
}

export interface TransportHandlers {
    connect: Callback
    close: Callback
    error: ErrorCallback
    data: DataCallback
}

export function NewTransport(type: string, handlers: TransportHandlers) : Transport {
    if(type === "tcp") {
        return new TCPTransport(handlers);
    }
    throw new Error(`no such transport: '${type}'`);
}

export interface Transport {
    close(): void;

    connect(url: url.UrlObject): void;
    destroy(): void;
    isAuthorized(): boolean;
    isClosed(): boolean;
    isConnected(): boolean;
    isEncrypted(): boolean;
    pause(): void;
    resume(): void;
    upgrade(tlsOptions: any, done: Function): void;
    write(data: Buffer | string): void;
}
