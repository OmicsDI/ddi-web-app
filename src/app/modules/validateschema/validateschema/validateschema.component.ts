import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {finalize, map} from "rxjs/operators";
import {ValidateService} from "@shared/services/validate.service";
import {environment} from "../../../../environments/environment";
import {LogService} from "@shared/modules/logs/services/log.service";
import {AppConfig} from "../../../app.config";

@Component({
  selector: 'validateschema',
  templateUrl: './validateschema.component.html',
  styleUrls: ['./validateschema.component.css']
})
export class ValidateschemaComponent implements OnInit {

  ngOnInit() {
  }

  @Input()
  requiredFileType:string = ".xml";

  noErrors = "";
  isErrorVal = true;
  isOmicsdi = true;
  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  errors: string[] = [];
  exceptionMessage: string
  public url: string;
  formData = new FormData();

  constructor(private http: HttpClient,
              private validateService: ValidateService,
              private logger: LogService,
              public appConfig: AppConfig) {
    this.url = environment.userServiceUrl;
  }

  isOmicsValidator(event){
    if (this.isOmicsdi){
      this.isOmicsdi = false;
    } else {
      this.isOmicsdi = true;
    }
    //alert("final value of omisdi is " + this.isOmicsdi);
    event.target.checked=true;
    //this.getErrors(event);
  }
  isError(event){

    if (this.isErrorVal){
      this.isErrorVal = false;
    } else {
      this.isErrorVal = true;
    }
    //alert("final value of iserror is " + this.isErrorVal);
    event.target.checked=true;
    //this.getErrors(event);

  }

  getErrors(event){
    this.errors = [];
    this.exceptionMessage = "Processing....";
    this.noErrors = "Processing....";
    const formData:FormData = new FormData();
    //alert(event.target.files[0].length);
    if(event.target.files != null && event.target.files[0] != null){
      const file:File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        //alert("filename is " + this.fileName);

        formData.append("file", file);
        //formData.append("validatorType", "omicsdi");
        //this.formData.append("isError", String(this.isErrorVal));
        if(this.isOmicsdi){
          formData.append("validatorType","omicsdi");
        } else{
          formData.append("validatorType","bycovid");
        }
        formData.append("isError", String(this.isErrorVal));
      }
      const logresponse = this.validateService.getValidateErrors(formData);

      logresponse.subscribe(result => {
            console.log(result);
            this.errors = result;
            //alert("length of errros is " + this.errors.length)
            if (this.errors.length == 0){
              this.noErrors = "No Errors Found!";
            }
          },
          error => {
            this.exceptionMessage = error.message;
            //alert(this.exceptionMessage);
            console.error('There was an error!', error);
            this.noErrors = "There was an exception while processing file!";
          })
      /*this.uploadSub = logresponse.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })*/
    }
  }

  uploadFile(){
    //this.getErrors(event);
    const formDataUpload = new FormData();
    formDataUpload.append("file", this.formData.get("file"));
    if(this.isOmicsdi){
      formDataUpload.append("validatorType","omicsdi");
    } else{
      formDataUpload.append("validatorType","bycovid");
    }
    formDataUpload.append("isError", String(this.isErrorVal));
    const logresponse = this.validateService.getValidateErrors(formDataUpload);

    logresponse.subscribe(result => {
          console.log(result);
          this.errors = result;
          //alert("length of errros is " + this.errors.length)
          if (this.errors.length == 0){
            this.noErrors = "No Errors Found!";
          }
        },
        error => {
          this.exceptionMessage = error.message;
          //alert(this.exceptionMessage);
          console.error('There was an error!', error);
          this.noErrors = "There was an exception while processing file!";
        })
    /*this.uploadSub = logresponse.subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
    })*/
  }

  /*onFileSelected(event) {
    //alert("inside event function");
    const file:File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("validatorType","bycovid");

      const uploaddata$ = this.http.post("http://localhost:8080/ddi_web_service_war/#!/dataset/checkfile", formData, {
        reportProgress: true,
        observe: 'body'
      }).subscribe(
          r => {
        this.errors = r;
        console.log(this.errors);},
        error => {
          this.exceptionMessage = error.message;
          //alert(this.exceptionMessage);
          console.error('There was an error!', error);
        }
      )

      const upload$ = this.http.post("http://localhost:8080/ddi_web_service_war/#!/dataset/checkfile", formData, {
        reportProgress: true,
        observe: 'events'
      })
          .pipe(
              finalize(() => this.reset())
          );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }
  }*/

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
