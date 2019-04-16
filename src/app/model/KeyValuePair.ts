export class KeyValuePair {
    key: string;
    value: string;

    public static instance(key: string, value: string): KeyValuePair {
        const result = new KeyValuePair();
        result.key = key;
        result.value = value;
        return result;
    }
}
