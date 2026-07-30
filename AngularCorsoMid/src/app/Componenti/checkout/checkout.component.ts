import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';

import { CartItem } from '../../models/cart-item';
import { Order } from '../../models/order';
import { User } from '../../models/user';



@Component({

selector:'app-checkout',

templateUrl:'./checkout.component.html',

styleUrls:['./checkout.component.css']

})


export class CheckoutComponent implements OnInit {



cart:CartItem[]=[];


total:number=0;



user:User|null=null;




customer={

name:'',

email:'',

address:''

};



orderCompleted=false;


loading=false;





constructor(


private cartService:CartService,


private orderService:OrderService,


private userService:UserService,


private router:Router


){}






ngOnInit(){



this.user=this.userService.getCurrentUser();




if(this.user){


this.customer.name=this.user.name;


this.customer.email=this.user.email;


}




this.loadCart();



}







loadCart(){


this.cart=this.cartService.getCart();


this.total=this.cartService.getTotal();


}








completeOrder(){



if(this.loading){

return;

}





if(!this.user){


alert(
'Devi effettuare il login prima di acquistare'
);


this.router.navigate(['/login']);


return;


}







if(

!this.customer.name ||

!this.customer.email ||

!this.customer.address

){



alert(

'Inserisci tutti i dati richiesti'

);


return;


}








if(this.cart.length===0){



alert(

'Il carrello è vuoto'

);


return;


}







this.loading=true;





const order:Order={



id:Date.now(),



userId:this.user.id,



products:this.cart.map(

item=>item.product

),



total:this.total,



purchaseDate:new Date().toISOString(),



status:'COMPLETED',



downloadAvailable:true



};









this.orderService.addOrder(order);





this.orderCompleted=true;





this.cartService.clear();





this.cart=[];


this.total=0;


this.loading=false;



}








goToPlanners(){


this.router.navigate(['/my-planners']);


}




}