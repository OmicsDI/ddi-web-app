import { Injectable } from '@angular/core';

@Injectable()
export class RedirectService {
    constructor() { }
    get(obj, url) {
        const mapForm = document.createElement('form');
        mapForm.target = '_blank';
        mapForm.method = 'GET';
        mapForm.action = url;
        Object.keys(obj).forEach(function(param) {
            const mapInput = document.createElement('input');
            mapInput.type = 'hidden';
            mapInput.name = param;
            mapInput.setAttribute('value', obj[param]);
            mapForm.appendChild(mapInput);
        });
        document.body.appendChild(mapForm);
        mapForm.submit();
    }

}
