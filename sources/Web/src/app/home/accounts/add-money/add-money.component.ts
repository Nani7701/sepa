import { Component } from '@angular/core';
import { HomeService } from 'src/app/core/shared/home.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/toastr-notification/toastr-notification.service';
import { AuthService } from 'src/app/core/shared/auth.service';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.scss']
})
export class AddMoneyComponent {
  profileData: any;
  applicant_id: any;
  cardData: any = [];
  constructor(private homeService: HomeService, private routerNavigate: Router, private alert: NotificationService,public authService: AuthService,) {
    this.profileData = JSON.parse(sessionStorage.getItem('userData'));
    this.getCardDetails();
  }
  getCardDetails() {
    this.homeService.getCardDetails().subscribe(res => {
      if (res['status'] == 0) {
        if (res['data']['status'] = 1) {
          this.cardData = res['data']['cards'];
        }
        if (res['data']['status'] = 0) {
          this.alert.error(res['data']['message'])
        }
      }
      else {
        this.alert.error(res['message'])
      }
    })
  }
  creditCardMask(credNumber) {
    let char = "*"
    credNumber = credNumber.replace(/[^0-9]+/g, ''); /*ensureOnlyNumbers*/
    let l = credNumber.length;
    if (l == 16) {
      return "**** " + "**** " + "**** " + credNumber.substring(12, l);
    }

    if (l == 19) {
      return "**** " + "**** " + "**** " + "*** " + credNumber.substring(15, l);
    }

    // return credNumber.substring(0,0) + char.repeat(l-4) + credNumber.substring(l-4,l);
    // return credNumber.substring(0, 4) + " " + credNumber.substring(4, 8) + " " + credNumber.substring(8, 12) + " " + credNumber.substring(12, l);
  }
}
