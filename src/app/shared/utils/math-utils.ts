export class MathUtils {
    /**
     * converts degree to radians
     * @param degree
     * @returns {number}
     */
    static toRadians(degree) {
        return degree * (Math.PI / 180);
    };

    /**
     * Converts radian to degree
     * @param radians
     * @returns {number}
     */
    static toDegree(radians) {
        return radians * (180 / Math.PI);
    }

    /**
     * Rounds a number mathematical correct to the number of decimals
     * @param number
     * @param decimals (optional, default: 5)
     * @returns {number}
     */
    static roundNumber(number, decimals = 2) {
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    }

    static sin(number) {
        return MathUtils.roundNumber(Math.sin(MathUtils.toRadians(number)), 2);
    }

    static cos(number) {
        return MathUtils.roundNumber(Math.cos(MathUtils.toRadians(number)), 2);
    }

    static tan(number) {
        return MathUtils.roundNumber(Math.tan(MathUtils.toRadians(number)));
    }
    static asin(number) {
        return MathUtils.roundNumber(MathUtils.toDegree(Math.asin(number)));
    }

    static acos (number) {
        return MathUtils.roundNumber(MathUtils.toDegree(Math.acos(number)));
    }

    static atan(number) {
        return MathUtils.roundNumber(MathUtils.toDegree(Math.atan(number)));
    }
}
