import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
    parse(url: any): UrlTree {
        const dus = new DefaultUrlSerializer();
        return dus.parse(url);
    }

    serialize(tree: UrlTree): any {
        const dus = new DefaultUrlSerializer();
        let path = dus.serialize(tree);
        // use your regex to replace as per your requirement.
        // path = path.replace(/%2/g, ',');
        path = path.replace(/%5B/g, '[');
        path = path.replace(/%5D/g, ']');
        return path;
    }
}