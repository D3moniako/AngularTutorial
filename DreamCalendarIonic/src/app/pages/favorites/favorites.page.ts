import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlannerService } from '../../core/services/planner.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { UserService } from '../../core/services/user.service';

import { Product } from '../../core/models/product';
import { User } from '../../core/models/user';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit, OnDestroy {


  favorites: Product[] = [];

  purchasedFavorites: Product[] = [];

  availableFavorites: Product[] = [];


  searchText = '';

  selectedCategory = 'Tutti';


  categories = [
    'Tutti',
    'Elegant',
    'Lifestyle',
    'Wellness',
    'Business'
  ];


  message = '';

  user: User | null = null;


  private userSubscription?: Subscription;



  constructor(

    private plannerService: PlannerService,

    private cartService: CartService,

    private orderService: OrderService,

    private userService: UserService

  ) {}




  ngOnInit(){


    this.userSubscription =
    this.userService.user$.subscribe(user=>{


      this.user = user;


      this.loadFavorites();


    });


  }





  loadFavorites(){


    this.favorites =
    this.plannerService.getFavorites();


    this.separateProducts();


  }





  private separateProducts(){


    this.purchasedFavorites = [];

    this.availableFavorites = [];



    this.favorites.forEach(product=>{


      if(this.isPurchased(product)){


        this.purchasedFavorites.push(product);


      }else{


        this.availableFavorites.push(product);


      }


    });


  }






  isPurchased(product: Product){


    if(!this.user){

      return false;

    }


    return this.orderService.hasPurchased(

      this.user.id,

      product.id

    );


  }





  get filteredAvailable(){


    return this.filterProducts(

      this.availableFavorites

    );


  }





  get filteredPurchased(){


    return this.filterProducts(

      this.purchasedFavorites

    );


  }





  private filterProducts(products: Product[]){


    const text =
    this.searchText

    .trim()

    .toLowerCase();




    return products.filter(product=>{


      const search =

      !text ||

      product.name

      .toLowerCase()

      .includes(text);



      const category =

      this.selectedCategory === 'Tutti'

      ||

      product.category === this.selectedCategory;




      return search && category;


    });


  }







  selectCategory(category:string){


    this.selectedCategory = category;


  }







  remove(product:Product){


    this.plannerService.toggleFavorite(product);


    this.loadFavorites();


    this.showMessage(
      '💔 Rimosso dai preferiti'
    );


  }






  addCart(product:Product){


    if(this.isPurchased(product)){


      this.showMessage(
        '✅ Possiedi già questo planner'
      );


      return;

    }



    this.cartService.add(product);



    this.showMessage(
      '🛒 Aggiunto al carrello'
    );


  }






  private showMessage(text:string){


    this.message=text;



    setTimeout(()=>{


      this.message='';


    },2500);


  }







  trackByProduct(

    index:number,

    product:Product

  ){


    return product.id;


  }






  ngOnDestroy(){


    this.userSubscription?.unsubscribe();


  }


}