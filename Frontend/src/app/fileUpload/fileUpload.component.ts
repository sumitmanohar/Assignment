import { Component, OnInit } from "@angular/core";
import { GlobalService } from "../providers/global.service";

@Component({
    templateUrl:'./fileUpload.component.html',
    styleUrls:['./fileUpload.component.css']
})
export class FileUploadComponent implements OnInit{
    fileToUpload: File;

    constructor(public global:GlobalService){}
    ngOnInit(){}
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        let url =this.global.basePath + '/fileUpload'
        this.global.postFile(this.fileToUpload,url).subscribe(res=>{
        console.log(res)
        },(err)=>{
            console.log(err)
        })

    }
}