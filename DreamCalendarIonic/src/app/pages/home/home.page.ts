import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlannerService } from '../../core/services/planner.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationCenterService } from '../../core/services/notification-center.service';



import { UserService } from '../../core/services/user.service';

import { Product } from '../../core/models/product';

import { MESSAGES } from '../../core/constants/messages';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  email = '';

  selectedCategory = 'Tutti';


  products: Product[] = [];



  menuOpen = false;



  days = Array.from(
    {length:31},
    (_,i)=>i+1
  );



  categories = [

    {
      name:'Tutti',
      icon:'✨'
    },

    {
      name:'Elegant',
      icon:'🌸'
    },

    {
      name:'Lifestyle',
      icon:'💖'
    },

    {
      name:'Wellness',
      icon:'🧘'
    },

    {
      name:'Business',
      icon:'💼'
    }

  ];



  stats = [

    {
      number:'15K+',
      label:'Clienti felici'
    },

    {
      number:'200+',
      label:'Planner creati'
    },

    {
      number:'99%',
      label:'Recensioni positive'
    }

  ];

    steps = [

    {
      title:'Acquista',
      text:'Scegli il planner perfetto.'
    },

    {
      title:'Scarica',
      text:'Ricevi subito il file digitale.'
    },

    {
      title:'Organizza',
      text:'Inizia una nuova routine.'
    }

  ];



  reviews=[

    {
      avatar:'👩🏻',
      name:'Sofia',
      text:'Il planner più elegante che abbia mai usato.'
    },

    {
      avatar:'👩🏼',
      name:'Martina',
      text:'Finalmente organizzo lavoro e vita privata.'
    },

    {
      avatar:'👩🏽',
      name:'Elisa',
      text:'Grafica bellissima e facile da usare.'
    }

  ];



  faq=[

    {
      q:'Funziona su iPad?',
      a:'Si, compatibile con GoodNotes e PDF.'
    },

    {
      q:'Quando ricevo il planner?',
      a:'Il download è immediato dopo l acquisto.'
    },

    {
      q:'Posso stamparlo?',
      a:'Si, tutti i planner sono PDF stampabili.'
    }

  ];





  constructor(

    private plannerService:PlannerService,

    private cartService:CartService,

    private notificationService:NotificationService,

    private userService:UserService,

    private router:Router,

    private  notificationCenterService:NotificationCenterService,
  ){}




  ngOnInit(){

    this.products =
    this.plannerService.getProducts();

  }





  get filteredProducts(){

    if(this.selectedCategory==='Tutti'){

      return this.products;

    }


    return this.products.filter(

      p=>p.category===this.selectedCategory

    );

  }






  selectCategory(category:string){

    this.selectedCategory =
    category;

  }





addCart(product: Product) {


  this.cartService.add(product);



  // NOTIFICA CAMPANELLA

  this.notificationCenterService.add({

    id: Date.now(),

    title:'Carrello aggiornato',

    message:
    product.name + ' aggiunto al carrello',

    icon:'🛒',

    type:'SYSTEM',

    date:new Date(),

    read:false

  });



  // TOAST TEMPORANEO

  this.notificationService.success(

    '🛒 ' + product.name + ' aggiunto'

  );


}



  toggleFavorite(product:Product){


    if(!this.userService.isLogged()){


      this.notificationService.warning(
        'Devi effettuare il login'
      );


      return;

    }


    this.plannerService.toggleFavorite(product);


  }






  openProduct(product:Product){


    this.router.navigate([

      '/products',

      product.id

    ]);


  }






  subscribe(){


    if(!this.email.trim()){


    this.notificationService.warning(
      'Inserisci la tua email ✉️'
    );
      return;

    }


    this.notificationService.success(
  '💖 Grazie! Riceverai il planner gratuito.'
  );


    this.email='';

  }






  toggleMenu(){

    this.menuOpen =
    !this.menuOpen;

  }



}