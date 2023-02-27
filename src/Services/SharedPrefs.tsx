import { singleton } from "tsyringe";

@singleton()
export default class SharedPrefs {

    setItem(k: string, v: string) {
        localStorage.setItem(k, v);
    }

    getItem(k: string): string | null {
        return localStorage.getItem(k);
    }

    removeItem(k: string) {
        return localStorage.removeItem(k);
    }
}