import { Component, OnInit } from '@angular/core';

import { PlannerService } from '../../services/planner.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product';



@Component({

selector:'app-shop',

templateUrl:'./shop.component.html',

styleUrls:['./shop.component.css']

})


export class ShopComponent implements OnInit {



products:Product[]=[];


filteredProducts:Product[]=[];



search:string='';


selectedCategory:string='Tutti';


sort:string='default';





categories:string[]=[

'Tutti',

'Elegant',

'Lifestyle',

'Wellness',

'Business'

];






constructor(

private plannerService:PlannerService,

private cartService:CartService

){}






ngOnInit(){


this.products = this.plannerService
.getProducts()
.map(product=>({...product}));


this.applyFilters();


}








applyFilters(){



const text=this.search
.trim()
.toLowerCase();





this.filteredProducts=this.products.filter(product=>{


const categoryOk =

this.selectedCategory==='Tutti'

||

product.category===this.selectedCategory;





const searchOk =

!text

||

product.name.toLowerCase()
.includes(text)

||

product.description.toLowerCase()
.includes(text)

||

product.category.toLowerCase()
.includes(text);



return categoryOk && searchOk;



});



this.applySort();



}










filterCategory(category:string){


this.selectedCategory=category;


this.applyFilters();


}









applySort(){



switch(this.sort){



case 'price-low':


this.filteredProducts.sort(

(a,b)=>a.price-b.price

);


break;





case 'price-high':


this.filteredProducts.sort(

(a,b)=>b.price-a.price

);


break;





case 'rating':


this.filteredProducts.sort(

(a,b)=>b.rating-a.rating

);


break;





default:


this.filteredProducts.sort(

(a,b)=>a.id-b.id

);


}



}









changeSort(){


this.applySort();


}









addCart(product:Product){



this.cartService.add(product);



alert(

'🛒 '+product.name+' aggiunto al carrello'

);



}









toggleFavorite(product:Product){



product.favorite=!product.favorite;



this.plannerService.toggleFavorite(product);



this.filteredProducts=[...this.filteredProducts];


}






}