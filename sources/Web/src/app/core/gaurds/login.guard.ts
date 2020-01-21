/**
* login gaurd
* Login Guard features are designed to protect login and authentication system against login attacks.
* @package LoginGuard
* @subpackage app\core\garuds\logingaurd
* @author SEPA Cyber Technologies, Sayyad M.
*/
import { AuthService } from '../shared/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private routerNavigate: Router
  ) { }
  canActivate(): boolean {
      if(this.authService.isAuthenticate()) {
        return false;
    }
    return true;
  }
}
