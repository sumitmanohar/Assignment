import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";



@Injectable({
    providedIn:"root"
})
export class GlobalService{
    basePath="http://localhost:5000"
    constructor(public http:HttpClient){}

    postFile(fileToUpload: File,url){
        let formData = new FormData(); 
        formData.append('thermometer', fileToUpload, fileToUpload.name); 
        return this.http.post(url, formData)
        }

        getRequest(url){
            let headers=new HttpHeaders();
            headers.append('Content-type',"application/json")
           return this.http.get(url,{headers:headers})
        }
}