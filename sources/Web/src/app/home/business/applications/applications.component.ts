import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  KYBStatus: any;
  loadContent:boolean=true;
  industrStatus: any;
 
   
  constructor(private homeService:HomeService,private alert:NotificationService,private routerNavigate:Router,private loader:HomeComponent) {
   this.insertKYB();
   this.industryStatus()
  }
 
  getKYBStatus(){
    this.homeService.getKYBStatus().subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
          this.KYBStatus=res['data']['Dashboard Status'];
           this.loader.apploader=false;
        }
        else if(res['data']['status']==1){
          this.loader.apploader=false;
           this.alert.error(res['data']['message'])
        }
      }
      else{
        this.loader.apploader=false;
        this.alert.error(res['message'])
      }
    });
   }
   insertKYB(){
    this.loader.apploader=true;
    this.homeService.insertKYB().subscribe(res => {
      if(res['status']==0){
        if(res['data']['status']==0){
          this.getKYBStatus();
        }
        else if(res['data']['status']==1){
          this.loader.apploader=false;
          this.alert.error(res['data']['message'])
        }
      }
      else{
        this.loader.apploader=false;
        this.alert.error(res['message'])
      }
    });
  }

  industryStatus(){

    this.homeService.industryStatus().subscribe(res => {
        this.industrStatus=res['data']['Dashboard Status']['isRestricted'];
        if(res['data']['Dashboard Status']['isRestricted']==1){
          this.routerNavigate.navigate(['home/application/typesbusiness']);
          
        //  home/application/typesbusiness
        }
    });
   }

  ngOnInit(){
    
  }
   
}
