import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../providers/global.service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl:'./chart.component.html',
    styleUrls:['./chart.component.css']
})
export class ChartComponent implements OnInit{
    
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
      graphLabels=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    public barChartLabels= [];
      public barChartType = 'bar';
      public barChartLegend = true;
      public barChartData=[]
  
   
    data: any[]=[];
    enable: boolean;
      constructor(public global:GlobalService,private spinnerService: Ng4LoadingSpinnerService,private toastr: ToastrService){}
    ngOnInit(){
  this.getThermometerData()
    }
    getThermometerData(){
      this.spinnerService.show()
        let url=this.global.basePath + '/chart';
        this.global.getRequest(url).subscribe((res:any)=>{
            this.enable=true
            this.spinnerService.hide()
         res.data.forEach(element => {
              this.barChartLabels.push(`${this.graphLabels[element._id.month-1]},${element._id.year}`)
             this.data.push(element.meanValue)
         });
      this.barChartData=[{data:this.data,label:'Tempreature'}]
        },(err)=>{
            console.log(err)
            this.spinnerService.hide()
            this.toastr.error('Internal Server Error', 'Error', {
              timeOut: 3000
            })
        })
    }
}