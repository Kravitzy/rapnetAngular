import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  { path: "home", component: MainComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }, // Default
  { path: "**", component: Page404Component } // All other
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
