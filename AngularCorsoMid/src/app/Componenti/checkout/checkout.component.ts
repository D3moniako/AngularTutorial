import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';

import { CartItem } from '../../models/cart-item';
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


private paymentService:PaymentService,


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













async completeOrder(){



this.errorMessage='';

this.successMessage='';




if(this.loading){

return;

}







// LOGIN


if(!this.user){


this.errorMessage=

'Devi effettuare il login prima di acquistare';


this.router.navigate(['/login']);


return;


}








// DATI CLIENTE


if(

!this.customer.name.trim() ||

!this.customer.email.trim() ||

!this.customer.address.trim()

){


this.errorMessage=

'Inserisci tutti i dati richiesti';


return;


}









// CARRELLO


if(this.cart.length===0){


this.errorMessage=

'Il carrello è vuoto';


return;


}







this.loading=true;








try{



// =====================================
// SALVATAGGIO DATI TEMPORANEI
// PRIMA DI STRIPE
// =====================================



localStorage.setItem(

'checkoutCustomer',

JSON.stringify(this.customer)

);





localStorage.setItem(

'checkoutCart',

JSON.stringify(this.cart)

);





localStorage.setItem(

'checkoutTotal',

this.total.toString()

);





localStorage.setItem(

'checkoutUserId',

this.user.id.toString()

);









// =====================================
// CREA SESSIONE STRIPE MOCK
// =====================================



const session =

await this.paymentService.createCheckoutSession(

this.cart

);







if(!session || !session.sessionId){


throw new Error(

'Sessione pagamento non creata'

);


}









// =====================================
// TEST LOCALE
// SIMULA RITORNO STRIPE
// =====================================



this.router.navigate([

'/payment-success'

]);





}

catch(error){



console.error(

'Errore pagamento',

error

);



this.errorMessage=

'Errore durante il pagamento';


this.loading=false;



}





}











// NAVIGAZIONE


goToPlanners(){


this.router.navigate([

'/my-planners'

]);


}






continueShopping(){


this.router.navigate([

'/shop'

]);


}











// TEST MANUALE


simulateStripePayment(){


this.successMessage=

'Pagamento Stripe completato (TEST)';


this.orderCompleted=true;


}







}