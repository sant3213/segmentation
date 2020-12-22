import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicResultsComponent } from './graphic-results/graphic-results.component';
import { HomeComponent } from './home/home.component';
import { Addressess } from './model/Addressess';
import { Base0 } from './model/Base0';
import { Base1 } from './model/Base1';

const routes: Routes = [
  {    
    path: '',    
    component: HomeComponent
  }, 
  {
    path:'graphic-result',
    component:GraphicResultsComponent,
    data: {    
      base0: Base0,
      base1: Base1,
      addresses: Addressess
    }, 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
