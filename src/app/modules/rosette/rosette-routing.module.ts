import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RosetteComponent} from './components/rosette/rosette.component';

const routes: Routes = [{
    path: '',
    component: RosetteComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RosetteRoutingModule {
}
