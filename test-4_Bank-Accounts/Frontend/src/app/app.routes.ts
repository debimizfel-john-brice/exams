import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { ListComponent } from './components/pages/list/list.component';
import { AddComponent } from './components/pages/add/add.component';

export const routes: Routes = [
    { path: "list", component: ListComponent },
    { path: "add", component: AddComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
];
