export class TimeUtils {
    static getMonthDay(dateString: string): string {
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month_int = parseInt(dateString.substr(4, 2), 10);
        const day_int = parseInt(dateString.substr(6, 2), 10);
        const month = month_names_short[month_int - 1];
        return month + ' ' + day_int + ' ';
    }
}