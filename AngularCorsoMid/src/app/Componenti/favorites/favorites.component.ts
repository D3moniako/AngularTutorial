import { Component, OnInit } from '@angular/core';

import { PlannerService } from '../../services/planner.service';

import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product';



@Component({

selector:'app-favorites',

templateUrl:'./favorites.component.html',

styleUrls:['./favorites.component.css']

})


export class FavoritesComponent implements OnInit {



favorites:Product[]=[];



constructor(

private plannerService:PlannerService,

private cartService:CartService

){}






ngOnInit(){


this.loadFavorites();


}






loadFavorites(){


this.favorites =

this.plannerService.getFavorites();


}







remove(product:Product){


this.plannerService.toggleFavorite(product);


this.loadFavorites();


}







addCart(product:Product){


this.cartService.add(product);


}






}