import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RequestKeyExtractorService} from './request-key-extractor.service';

const STATE_KEY_PREFIX = 'http_requests:';

@Injectable()
export class TransferHttpResponseInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState,
              private requestKeyExtractor: RequestKeyExtractorService,
              @Inject(PLATFORM_ID) private platformId: string) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Nothing to do with non-GET requests
    if (req.method.toUpperCase() !== 'GET') {
      return next.handle(req);
    }

    const key = makeStateKey<HttpResponse<object>>(STATE_KEY_PREFIX + this.requestKeyExtractor.getKey(req));
    if (isPlatformBrowser(this.platformId)) {
      // Try reusing transferred response from server
      const cachedResponse = this.transferState.get(key, null);
      if (cachedResponse) {
        this.transferState.remove(key); // using transferred state should be used for the very first time
        return of(new HttpResponse({
          body: cachedResponse.body,
          status: 200,
          statusText: 'OK (from server)',

        }));
      }
      return next.handle(req);
    }

    if (isPlatformServer(this.platformId)) {
      // Try saving response to be transferred to browser
      return next.handle(req).pipe(tap(event => {
        if (event instanceof HttpResponse && event.status === 200) {
          // Update the cache.
          // for only body is preserved as it is. It would be nice to transfer whole response, but http response is not
          // a POJO and it needs custom serialization/deserialization.
          const response = {
            body: event.body
          };
          this.transferState.set(key, response);
        }
      }));
    }
  }
}
