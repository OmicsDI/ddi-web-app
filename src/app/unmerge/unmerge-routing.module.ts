import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnmergeComponent} from 'pages/unmerge/unmerge.component';

const routes: Routes = [{
    path: '',
    component: UnmergeComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnmergeRoutingModule {
}
