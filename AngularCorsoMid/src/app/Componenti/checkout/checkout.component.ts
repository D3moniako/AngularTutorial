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



lastOrderId:number=0;



errorMessage:string='';


successMessage:string='';







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









get totalItems():number{



return this.cart.reduce(



(total,item)=>


total + item.quantity,


0


);



}









completeOrder(){



this.errorMessage='';


this.successMessage='';





if(this.loading){


return;


}









// ================================================
// CONTROLLO LOGIN
// ================================================



if(!this.user){



this.errorMessage =

'Devi effettuare il login prima di acquistare';



this.router.navigate(['/login']);



return;


}









// ================================================
// CONTROLLO DATI CLIENTE
// ================================================



if(



!this.customer.name.trim() ||


!this.customer.email.trim() ||


!this.customer.address.trim()



){



this.errorMessage =

'Inserisci tutti i dati richiesti';



return;



}









// ================================================
// CONTROLLO CARRELLO
// ================================================



if(this.cart.length===0){



this.errorMessage =

'Il carrello è vuoto';



return;



}









this.loading=true;









// ================================================
// CREAZIONE ORDINE
// ================================================



const orderId = Date.now();






const order:Order={



id:orderId,



userId:this.user.id,



products:



this.cart.map(item=>item.product),



total:this.total,



purchaseDate:



new Date().toISOString(),



status:'COMPLETED',



downloadAvailable:true,





customerName:



this.customer.name,



customerEmail:



this.customer.email,



customerAddress:



this.customer.address



};









// ================================================
// SALVATAGGIO ORDINE
// ================================================



this.orderService.addOrder(order);








this.lastOrderId=orderId;



this.successMessage=

'Ordine completato correttamente';





this.orderCompleted=true;









// ================================================
// PULIZIA CARRELLO
// ================================================



this.cartService.clear();



this.cart=[];


this.total=0;



this.loading=false;



}









goToPlanners(){



this.router.navigate(['/my-planners']);



}










continueShopping(){



this.router.navigate(['/shop']);



}





}