export class ObjectUtils {
    static renameKey(oldKey: string, newKey: string, object: Object) {
        if (oldKey !== newKey && oldKey in object) {
            Object.defineProperty(object, newKey,
                Object.getOwnPropertyDescriptor(object, oldKey));
            delete object[oldKey];
        }
    }

    static upperName(lower: string) {
        return lower == null ? "" : lower.replace(/^\w/, function (chr) {
            return chr.toUpperCase();
        });
    }
}
