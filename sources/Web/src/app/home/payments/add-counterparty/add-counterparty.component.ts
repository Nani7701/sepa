import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { PagerService } from 'src/app/core/shared/pager.service';
import {  map, filter } from 'rxjs/operators';
import { HomeService } from 'src/app/core/shared/home.service';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import { IndexService } from 'src/app/core/shared/index.service';


@Component({
  selector: 'app-add-counterparty',
  templateUrl: './add-counterparty.component.html',
  styleUrls: ['./add-counterparty.component.scss']
})
export class AddCounterpartyComponent implements OnInit {

  SearchForm: FormGroup
  CounterpartyModal: BsModalRef;
  userDetails: any;
  searchTerm: Subject<string> = new Subject();

  baseUrl: string = `${environment.serviceUrl}service/v1/globalsearch/0/`;
  searchResults: any;
  selectedRow : any={};
  userData: any;
  userInfo: any;
  acc_type: any;
  flagVerify: any;
  isSmsVerified:any;
  // pager: any = {};
  // pagedItems: any[];

  constructor(private fb: FormBuilder, private modalService: BsModalService, private http: HttpClient,
              private homeService: HomeService, private alert: NotificationService, private router:Router,
              private locationStrategy: LocationStrategy, private route: ActivatedRoute, public indexService: IndexService) {
    // this.flagVerify = sessionStorage.getItem('smsVerify');
    // sessionStorage.removeItem('smsVerify');

  //   this.router.events.subscribe((event) => {
  //     if(event) {
  //         console.log(event);
  //     }
  // });
    this.userData = JSON.parse(sessionStorage.getItem('userData'));
    this.userInfo = this.userData.data.userInfo;
    this.acc_type = this.userInfo.account_type;

  

  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)  
  //   ).subscribe((event: NavigationEnd) => {
  //   //  console.log(event.url);
  //     this.isSmsVerified=false;
  //   });

  //   this.route.queryParams.subscribe(params => {

  //    // this.flagVerify = params["flag"];
  //    console.log(params)
  // });

  }

  ngOnInit() {
    this.SearchAddParty();
    this.preventBackButton();
    this.SearchForm = this.fb.group({
      search_name: ['', [Validators.required]]
    });
  }

  // getPage(e) {
  //   alert(e);
  // }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  getShortName(name: string) { 
    return name.charAt(0).toUpperCase()
  }

  setClickedRow(payUser) {
    this.selectedRow = payUser;
  }

  searchEntries(term): Observable<any> {
    this.selectedRow={}
      return this.http.get(this.baseUrl + term).pipe(map(response => {
        this.searchResults = response['data']['results'];
       // this.setPage(1);
      })
    );
  }

//   setPage(page: number) {
//     // get pager object from service
//     this.pager = this.pagerService.getPager(this.searchResults.length, page);

//     // get current page of items
//     this.pagedItems = this.searchResults.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }

  _searchEntries(term) {
    this.searchEntries(term).subscribe(response => {
      console.log(response);
    }, err => {
      console.log(err);
    })
  }

  SearchAddParty() {
    this.searchTerm.debounceTime(200)
      .distinctUntilChanged().filter((term) => {
        return term.length > 0;
      }).subscribe(searchterm => {
      this._searchEntries(searchterm);
    });
  }

  createCounterParty(Salert: TemplateRef<any>) {
    if(this.isEmpty(this.selectedRow)) {
      const addCounterParty = {
        full_name: this.selectedRow['full_name'],
        email: this.selectedRow['email'],
        mobile: this.selectedRow['mobile'],
        country: this.selectedRow['country_id']
      };
      this.homeService.postCouterparty(addCounterParty).subscribe(res  => {
        if(res['status'] === 0) {
          if(res['data']['status'] === 0) {
            // this.alert.success(res['data']['message']);
            this.CounterpartyModal = this.modalService.show(Salert);
          } else if(res['data']['status'] === 1) {
            this.alert.warn(res['data']['message']);
          }
         } else {
          this.alert.error(res['message']);
        }
      });
    } else {
      this.alert.error('Please select one atleast');
    }
  }

  isEmpty(obj) {
     if(Object.keys(obj).length === 0){
       return false;
     }
     else{
       return true;
     }
  }

  AddedCounterParty(Salert: TemplateRef<any>) {
    this.CounterpartyModal = this.modalService.show(Salert);
  }

  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alert.success('Copied link');
  }

  backToPayments() {
    this.CounterpartyModal.hide();
    if(this.acc_type === 'Personal') {
      this.router.navigateByUrl('/home/payments');
    } else if(this.acc_type === 'Business') {
      this.router.navigateByUrl('/home/payments_tab');
    }
  }

  inviteClose() {
    if(this.acc_type === 'Personal') {
      this.router.navigateByUrl('/home/payments');
    } else if(this.acc_type === 'Business'){
      this.router.navigateByUrl('/home/payments_tab');
    }
  }

}
