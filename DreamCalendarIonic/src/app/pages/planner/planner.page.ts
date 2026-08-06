import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlannerService } from '../../core/services/planner.service';
import { CartService } from '../../core/services/cart.service';

import { NotificationService } from '../../core/services/notification.service';
import { NotificationCenterService } from '../../core/services/notification-center.service';

import { UserService } from '../../core/services/user.service';

import { Product } from '../../core/models/product';



@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage implements OnInit {



  products: Product[] = [];

  filteredProducts: Product[] = [];


  searchText = '';

  selectedCategory = 'Tutti';



  categories: string[] = [

    'Tutti',

    'Elegant',

    'Lifestyle',

    'Wellness',

    'Business'

  ];





  constructor(


    private plannerService: PlannerService,


    private cartService: CartService,


    private notificationService: NotificationService,


    private notificationCenterService: NotificationCenterService,


    private userService: UserService,


    private router: Router


  ) {}






  ngOnInit() {


    this.loadProducts();


  }







  private loadProducts(){


    this.products =
    this.plannerService.getProducts();


    this.applyFilter();


  }








  filterCategory(category:string){


    this.selectedCategory = category;


    this.applyFilter();


  }








  applyFilter(){



    const text =
    this.searchText
    .toLowerCase()
    .trim();




    this.filteredProducts =

    this.products.filter(product=>{


      const categoryOk =


      this.selectedCategory === 'Tutti'


      ||


      product.category === this.selectedCategory;






      const searchOk =


      !text


      ||


      product.name
      .toLowerCase()
      .includes(text)



      ||


      product.description
      .toLowerCase()
      .includes(text);






      return categoryOk && searchOk;



    });



  }









  addCart(product:Product){



    // controllo login

    if(!this.userService.isLogged()){



      this.notificationService.warning(

        '🔐 Devi effettuare il login per aggiungere prodotti'

      );



      this.router.navigate(['/login']);



      return;



    }






    // aggiunge al carrello

    this.cartService.add(product);






    // notifica campanella

    this.notificationCenterService.add({



      id:Date.now(),



      title:'Carrello aggiornato',



      message:

      product.name + ' aggiunto al carrello',



      icon:'🛒',



      type:'SYSTEM',



      date:new Date(),



      read:false



    });






    // toast

    this.notificationService.success(


      '🛒 ' + product.name + ' aggiunto'


    );



  }









  toggleFavorite(product:Product){



    this.plannerService.toggleFavorite(product);




    this.products =

    this.plannerService.getProducts();




    this.filteredProducts =

    [...this.products];



  }








  openProduct(product:Product){



    this.router.navigate([



      '/products',



      product.id



    ]);



  }



}