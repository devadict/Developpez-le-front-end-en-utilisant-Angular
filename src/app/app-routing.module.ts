import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NgForOf, NgIf} from "@angular/common";
import {CountryDetailComponent} from "./pages/country-detail/country-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':id',
    component: CountryDetailComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgForOf, NgIf],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
