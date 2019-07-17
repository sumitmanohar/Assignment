import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../providers/global.service";

@Component({
    templateUrl:'./chart.component.html',
    styleUrls:['./chart.component.css']
})
export class ChartComponent implements OnInit{
    
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };
    
    public barChartLabels=[]
      public barChartType = 'bar';
      public barChartLegend = true;
      public barChartData=[]
  
   
    data: any[]=[];
    enable: boolean;
      constructor(public global:GlobalService){}
    ngOnInit(){
  this.getThermometerData()
    }
    getThermometerData(){
        let url=this.global.basePath + '/chart';
        this.global.getRequest(url).subscribe((res:any)=>{
            this.enable=true
         res.data.forEach(element => {
             this.barChartLabels.push(element.month)
             this.data.push(element.value/element.count)
         });
      this.barChartData=[{data:this.data,label:'Tempreature'}]
      
         
        },(err)=>{
            console.log(err)
        })
    }
}