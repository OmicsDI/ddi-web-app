
import {BehaviorSubject} from 'rxjs';

export abstract class AsyncInitialisedComponent {
    loadedState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loadedState$ = this.loadedState.asObservable();

    protected constructor() {
    }

    protected componentLoaded() {
        this.loadedState.next(true);
    }
}
