export class TimeUtils {
    static getMonthDay(dateString: string): string {
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month_int = parseInt(dateString.substr(4, 2), 10);
        const day_int = parseInt(dateString.substr(6, 2), 10);
        const month = month_names_short[month_int - 1];
        return month + ' ' + day_int + ' ';
    }

    static getMonthName(month: number): string {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month];
    }

    static getDayOfWeek(day: number): string {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
    }
}
