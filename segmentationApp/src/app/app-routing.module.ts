import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicResultsComponent } from './graphic-results/graphic-results.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {    
    path: '',    
    component: HomeComponent
  }, 
  {
    path:'graphic-result',
    component:GraphicResultsComponent,
    data: {    
      data: ''
    }, 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
