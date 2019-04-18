export class ArrayUtils {

    /**
     * add an element into the beginning of the array
     * @param value
     * @param array
     * @returns {any}
     */
    public static prepend(value, array) {
        const newArray = array.slice();
        newArray.unshift(value);
        return newArray;
    }

    /**
     * Add all values from map dest to map source
     * @param source
     * @param dest
     */
    public static addAll<K, V>(source: Map<K, V[]>, dest: Map<K, V[]>): Map<K, V[]> {
        dest.forEach((value, key) => {
            if (source.has(key)) {
                source.set(key, value.concat(source.get(key)));
            } else {
                source.set(key, value);
            }
        });
        return source;
    }

    public static pushArray(arr: any[], arr2: any[]) {
        arr.push.apply(arr, arr2);
    }
}
