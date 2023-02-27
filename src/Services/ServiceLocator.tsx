import { container, InjectionToken } from "tsyringe";

export function getIt<T>(token: InjectionToken<T>) {
    return container.resolve(token);
}