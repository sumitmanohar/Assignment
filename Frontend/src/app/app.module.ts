import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Route, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { FileUploadComponent } from './fileUpload/fileUpload.component';
import { ChartComponent } from './chart/chart.component';
import { HttpClientModule } from '@angular/common/http';
import {ChartsModule} from 'ng2-charts'

const route: Routes =[{path:'',redirectTo:'fileUpload', pathMatch:'full'},
  {path:'fileUpload',component:FileUploadComponent},
{path:'chart',component:ChartComponent}]

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    FileUploadComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route),
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
