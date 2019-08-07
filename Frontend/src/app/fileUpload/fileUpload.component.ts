import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../providers/global.service";
import { ToastrService } from "ngx-toastr";

@Component({
    templateUrl:'./fileUpload.component.html',
    styleUrls:['./fileUpload.component.css']
})
export class FileUploadComponent implements OnInit{
    fileToUpload: File;
    failedList:any=[];
    result:any
    isFlag:boolean

    constructor(public global:GlobalService,private toastr: ToastrService){}
    ngOnInit(){}


    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        
        let url =this.global.basePath + '/fileUpload'
        this.global.postFile(this.fileToUpload,url).subscribe(res=>{
            console.log(res)
            this.result=res
            this.failedList=this.result.errorData;
            if(this.failedList.length>0){
                this.isFlag=true
            }else{
                this.isFlag=false
            }
            console.log(this.isFlag)
            this.toastr.success('File Upload Successfully', 'Success',{
                timeOut: 3000
              });
        },(err)=>{
            console.log(err)
            if(err.status==400){
                this.toastr.error(err.error.msg, 'Error', {
                    timeOut: 3000
                  }) 
            }else{
                this.toastr.error('Internal Server Error', 'Error', {
                    timeOut: 3000
                  })
            }
            
            
        })

    }

    close(){
        this.isFlag=false  
    }
}