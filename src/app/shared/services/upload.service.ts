import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UploadService {

    constructor(private http: HttpClient) {
    }

    dataURLtoFile(dataurl, filename): File {
        const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    uploadFile(url: string, file: File): Observable<number> {

        const formData = new FormData();
        formData.append('file', file, file.name);

        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'text'
        });

        // create a new progress-subject for every file
        const progress = new Subject<number>();

        // send the http-request and subscribe for progress-updates
        this.http.request(req).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {

                // calculate the progress percentage
                const percentDone = Math.round(100 * event.loaded / event.total);

                // pass the percentage into the progress-stream
                progress.next(percentDone);
            } else if (event instanceof HttpResponse) {

                // Close the progress-stream if we get an answer form the API
                // The upload is complete
                progress.complete();
            }
        });

        // return the map of progress.observables
        return progress.asObservable();
    }
}
