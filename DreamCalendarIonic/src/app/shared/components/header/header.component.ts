import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';


import {
  Subscription
} from 'rxjs';


import {
  Router
} from '@angular/router';


import {
  UserService
} from '../../../core/services/user.service';


import {
  User
} from '../../../core/models/user';



@Component({

selector:'app-header',

templateUrl:'./header.component.html',

styleUrls:['./header.component.scss']

})
export class HeaderComponent implements OnInit, OnDestroy {



user: User | null = null;



private userSubscription?: Subscription;





constructor(

private userService: UserService,

private router: Router

){}







ngOnInit(){


this.userSubscription =
this.userService.user$

.subscribe(user=>{


this.user=user;


});


}







logout(){


this.userService.logout();


this.router.navigate(['/login']);


}







goLogin(){


this.router.navigate(['/login']);


}







goRegister(){


this.router.navigate(['/register']);


}







goCart(){


this.router.navigate(['/cart']);


}







ngOnDestroy(){


this.userSubscription?.unsubscribe();


}



}