import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {bootstrapWorkerUi, WORKER_UI_LOCATION_PROVIDERS} from '@angular/platform-webworker';

if (environment.production) {
    enableProdMode();
}

// document.addEventListener('DOMContentLoaded', () => {
//
// });
bootstrapWorkerUi('webworker.bundle.js', WORKER_UI_LOCATION_PROVIDERS);
