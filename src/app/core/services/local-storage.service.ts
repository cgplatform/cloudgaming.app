import * as CryptoJS from "crypto-js";
import { Injectable } from "@angular/core";

import { config } from "app.config";

@Injectable({
    providedIn: "root"
})
export class LocalStorageService {
    private key: string = config.app.storageKey;

    private encrypt(value: string): string {
        return CryptoJS.AES.encrypt(value, this.key).toString();
    }

    private decrypt(value: string) {
        return CryptoJS.AES.decrypt(value, this.key).toString(
            CryptoJS.enc.Utf8
        );
    }

    get(key: string) {
        //key = this.encrypt(key);
        const chunk = localStorage.getItem(key);
        return chunk ? this.decrypt(chunk) : chunk;
    }

    set(key: string, value: string) {
        //key = this.encrypt(key);
        value = this.encrypt(value);
        localStorage.setItem(key, value);
    }

    remove(key: string) {
        //key = this.encrypt(key);

        localStorage.removeItem(key);
    }
}
