import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ViewportScroller } from '@angular/common';

import { Subscription } from 'rxjs';

import { PlannerService } from '../../core/services/planner.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { UserService } from '../../core/services/user.service';
import { NotificationService } from '../../core/services/notification.service';

import { Product, Review } from '../../core/models/product';
import { User } from '../../core/models/user';

import { MESSAGES } from '../../core/constants/messages';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {


  product?: Product;


  relatedProducts: Product[] = [];


  quantity = 1;


  user: User | null = null;


  canReview = false;


  private userSubscription?: Subscription;



  newReview = {

    rating: 5,

    comment: ''

  };



  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private plannerService: PlannerService,

    private cartService: CartService,

    private orderService: OrderService,

    private userService: UserService,

    private notificationService: NotificationService,

    private viewportScroller: ViewportScroller

  ) {}





  ngOnInit() {


    this.route.paramMap.subscribe(params => {


      const id = Number(params.get('id'));



      this.product = this.plannerService.getProduct(id);



      if(this.product){

        this.quantity = 1;

        this.loadRelatedProducts();

        this.checkReviewPermission();



        setTimeout(()=>{

          this.viewportScroller.scrollToPosition([0,0]);

        },100);

      }


    });




    this.userSubscription =
    this.userService.user$.subscribe(user=>{


      this.user = user;

      this.checkReviewPermission();


    });



  }





  checkReviewPermission(){


    if(!this.user || !this.product){

      this.canReview=false;

      return;

    }



    this.canReview =
    this.orderService.hasPurchased(

      this.user.id,

      this.product.id

    );


  }






  loadRelatedProducts(){


    if(!this.product){

      return;

    }



    this.relatedProducts =
    this.plannerService
    .getProducts()

    .filter(p=>p.id !== this.product!.id)

    .slice(0,3);


  }






  increaseQuantity(){

    this.quantity++;

  }



  decreaseQuantity(){

    if(this.quantity>1){

      this.quantity--;

    }

  }





  addCart(){


    if(!this.userService.isLogged()){


    this.notificationService.warning(
  MESSAGES.SHOP.LOGIN_REQUIRED
);


      this.router.navigate(['/login']);

      return;

    }



    if(!this.product){

      return;

    }



    for(let i=0;i<this.quantity;i++){

      this.cartService.add(this.product);

    }



    this.notificationService.success(
    MESSAGES.CART.ADDED
    );


  }







  toggleFavorite(){


    if(!this.userService.isLogged()){


      this.notificationService.warning(
        'Devi effettuare il login'
      );


      this.router.navigate(['/login']);

      return;

    }



    if(!this.product){

      return;

    }



    this.plannerService.toggleFavorite(this.product);



    this.product =
    this.plannerService.getProduct(this.product.id);


  }







  addReview(){


    if(!this.product){

      return;

    }



    if(!this.canReview){

      alert(
        'Devi acquistare questo planner prima'
      );

      return;

    }



    if(!this.newReview.comment.trim()){

      alert(
        'Inserisci un commento'
      );

      return;

    }





    const review: Review = {


      id: Date.now(),


      user:
      this.user?.name || 'Utente',


      rating:
      Number(this.newReview.rating),



      comment:
      this.newReview.comment,



      date:
      new Date().toLocaleDateString('it-IT'),



      verified:true

    };




    this.plannerService.addReview(

      this.product.id,

      review

    );




    this.product =
    this.plannerService.getProduct(
      this.product.id
    );



    this.newReview={

      rating:5,

      comment:''

    };


  }







  addRelatedToCart(product:Product){


    if(!this.userService.isLogged()){


      this.router.navigate(['/login']);

      return;

    }



    this.cartService.add(product);


  }







  toggleFavoriteRelated(product:Product){


    if(!this.userService.isLogged()){

      this.router.navigate(['/login']);

      return;

    }



    this.plannerService.toggleFavorite(product);


    product.favorite =
    this.plannerService.isFavorite(product.id);


  }







  ngOnDestroy(){


    this.userSubscription?.unsubscribe();


  }


}