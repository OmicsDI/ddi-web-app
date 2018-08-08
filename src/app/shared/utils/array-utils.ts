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
}
