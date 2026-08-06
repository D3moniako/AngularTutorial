import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../../core/services/order.service';
import { PaymentService } from '../../core/services/payment.service';
import { CartService } from '../../core/services/cart.service';

import { Order } from '../../core/models/order';
import { Payment } from '../../core/models/payment';

import { NotificationCenterService } from '../../core/services/notification-center.service';


@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {


  orderId: number = 0;

  message: string = '';

  loading: boolean = true;



  constructor(

    private orderService: OrderService,

    private paymentService: PaymentService,

    private cartService: CartService,

    private router: Router,

    private notificationCenterService: NotificationCenterService

  ) {}



  ngOnInit() {

    this.completePayment();

  }





  completePayment() {


    try {


      const completed =
      sessionStorage.getItem('paymentCompleted');


      const lastOrder =
      localStorage.getItem('lastOrderId');



      if(completed && completed === lastOrder){


        this.orderId = Number(lastOrder);


        this.message =
        'Pagamento già confermato. I tuoi planner sono disponibili.';


        this.loading=false;


        return;

      }





      const customerData =
      localStorage.getItem('checkoutCustomer');


      const cartData =
      localStorage.getItem('checkoutCart');


      const totalData =
      localStorage.getItem('checkoutTotal');


      const userData =
      localStorage.getItem('checkoutUserId');





      if(!customerData || !cartData || !totalData || !userData){


        this.message =
        'Dati ordine mancanti';


        this.loading=false;


        return;

      }





      const customer =
      JSON.parse(customerData);



      const cart =
      JSON.parse(cartData);



      const userId =
      Number(userData);



      const total =
      Number(totalData);





      const id = Date.now();


      const paymentId = id + 1;





      const order: Order = {


        id:id,


        userId:userId,


        products:
        cart.map((item:any)=>item.product),


        total:total,


        purchaseDate:
        new Date().toISOString(),


        status:'PAGATO',


        downloadAvailable:true,


        customerName:customer.name,


        customerEmail:customer.email,


        customerAddress:customer.address,


        paymentId:paymentId


      };





      const existing =
      this.orderService.getOrderById(id);




      if(!existing){


        this.orderService.addOrder(order);



        this.notificationCenterService.add({


          id:Date.now(),


          title:'Ordine completato',


          message:
          'Il tuo ordine #' + id +
          ' è stato confermato.',


          icon:'📦',


          type:'ORDER',


          date:new Date(),


          read:false


        });


      }





      this.orderId=id;



      localStorage.setItem(
        'lastOrderId',
        id.toString()
      );






      const payment:Payment = {


        id:paymentId,


        orderId:id,


        userId:userId,


        amount:total,


        status:'COMPLETED',


        paymentDate:
        new Date().toISOString(),


        method:'STRIPE'


      };




      this.paymentService.createPayment(payment);





      sessionStorage.setItem(
        'paymentCompleted',
        id.toString()
      );





      this.cartService.clear();




      localStorage.removeItem('checkoutCustomer');

      localStorage.removeItem('checkoutCart');

      localStorage.removeItem('checkoutTotal');

      localStorage.removeItem('checkoutUserId');





      this.message =
      'Pagamento completato. I tuoi planner sono disponibili.';



      this.loading=false;



    }

    catch(error){


      console.error(
        'Errore pagamento:',
        error
      );


      this.message =
      'Errore durante la conferma pagamento';



      this.loading=false;


    }


  }





  goPlanner(){


    this.router.navigate([
      '/my-planners'
    ]);


  }



}