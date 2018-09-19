export class CookieUtils {
    static setCookie(name: string, value: string, path: string, expire: Date) {
        if (null == path) {
            path = '/';
        }

        document.cookie = name + '=' + value + '; path=' + path + '; expires=' + expire.toUTCString();
    }
}
