import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { Product } from '../models/product';

import { CartItem } from '../models/cart-item';

import { UserService } from './user.service';



@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {



  private items: CartItem[] = [];



  private cartSubject =
  new BehaviorSubject<CartItem[]>([]);



  cart$ =
  this.cartSubject.asObservable();




  private userSubscription?: Subscription;






  constructor(
    private userService: UserService
  ) {



    this.userSubscription =

    this.userService.user$

    .subscribe(user=>{


      // UTENTE LOGOUT

      if(!user){


        this.items=[];


        this.cartSubject.next([]);


        return;


      }



      // UTENTE LOGIN

      this.loadCart();



    });



  }









  private getCartKey(): string | null {



    const user =

    this.userService.getCurrentUser();




    if(!user){


      return null;


    }




    return 'cart_' + user.id;



  }









  add(product: Product) {



    const key =

    this.getCartKey();




    // sicurezza

    // nessun utente loggato

    if(!key){


      return;


    }







    const existing =

    this.items.find(


      item =>

      item.product.id === product.id


    );







    if(existing){



      existing.quantity++;



      existing.subtotal =

      existing.quantity *

      existing.product.price;



    }

    else {



      this.items.push({



        id: Date.now(),



        product:{...product},



        quantity:1,



        subtotal:product.price



      });



    }





    this.update();



  }









  remove(id:number){



    this.items =

    this.items.filter(


      item =>

      item.id !== id


    );



    this.update();



  }









  increase(item:CartItem){



    item.quantity++;



    item.subtotal =

    item.quantity *

    item.product.price;



    this.update();



  }









  decrease(item:CartItem){



    if(item.quantity > 1){



      item.quantity--;



      item.subtotal =

      item.quantity *

      item.product.price;



      this.update();



    }

    else {



      this.remove(item.id);


    }



  }









  clear(){



    const key =

    this.getCartKey();




    if(key){


      localStorage.removeItem(key);


    }




    this.items=[];



    this.cartSubject.next([]);



  }









  getCart():CartItem[]{


    return [

      ...this.items

    ];


  }









  getItems():CartItem[]{


    return [

      ...this.items

    ];


  }









  getTotal():number {



    return this.items.reduce(


      (total,item)=>

      total + item.subtotal,


      0


    );


  }









  getCount():number {



    return this.items.reduce(


      (total,item)=>

      total + item.quantity,


      0


    );


  }









  private update(){



    this.saveCart();



    this.cartSubject.next(


      [

        ...this.items

      ]

    );


  }









  private saveCart(){



    const key =

    this.getCartKey();




    if(!key){


      return;


    }





    localStorage.setItem(


      key,


      JSON.stringify(this.items)


    );



  }









  private loadCart(){



    const key =

    this.getCartKey();




    if(!key){



      this.items=[];



      this.cartSubject.next([]);



      return;


    }







    try {



      const data =

      localStorage.getItem(key);




      this.items =

      data

      ?

      JSON.parse(data)

      :

      [];





      this.cartSubject.next(


        [

          ...this.items

        ]

      );



    }

    catch{



      this.items=[];


      this.cartSubject.next([]);



    }



  }









  ngOnDestroy(){



    this.userSubscription?.unsubscribe();



  }



}