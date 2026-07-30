import { Injectable } from '@angular/core';

import { Product } from '../models/product';



@Injectable({
providedIn:'root'
})


export class PlannerService {



private products:Product[]=[


{
id:1,

name:'Rose Gold Luxury Planner',

image:'assets/images/calendar/rose-gold.jpg',

price:14.99,

category:'Elegant',

description:
'Planner digitale premium rosa oro con calendario mensile, settimanale e obiettivi.',

badge:'BEST SELLER',

rating:5,

favorite:false,

downloadUrl:
'assets/downloads/rose-gold-planner.pdf'

},



{
id:2,

name:'Dream Life Planner',

image:'assets/images/calendar/dream-life.jpg',

price:12.99,

category:'Lifestyle',

description:
'Planner creativo per organizzare sogni, obiettivi e abitudini.',

badge:'NUOVO',

rating:5,

favorite:false,

downloadUrl:
'assets/downloads/dream-life-planner.pdf'

},



{
id:3,

name:'Self Care Planner',

image:'assets/images/calendar/self-care.jpg',

price:9.99,

category:'Wellness',

description:
'Planner dedicato al benessere personale e alla cura di sé.',

badge:'WELLNESS',

rating:5,

favorite:false,

downloadUrl:
'assets/downloads/self-care-planner.pdf'

},



{
id:4,

name:'Business Woman Planner',

image:'assets/images/calendar/business.jpg',

price:18.99,

category:'Business',

description:
'Planner professionale per lavoro, appuntamenti e produttività.',

badge:'PREMIUM',

rating:5,

favorite:false,

downloadUrl:
'assets/downloads/business-planner.pdf'

}


];







private favorites:Product[] =
this.loadFavorites();









constructor(){}









// ================================
// PRODUCTS
// ================================


getProducts():Product[]{


return this.products.map(product=>({...product}));


}









getProduct(id:number):Product | undefined{


const product=this.products.find(

p=>p.id===id

);



return product ? {...product} : undefined;


}











// ================================
// FAVORITES
// ================================


toggleFavorite(product:Product){



const index=this.favorites.findIndex(

item=>item.id===product.id

);





if(index>=0){


this.favorites.splice(index,1);



product.favorite=false;



}

else{


this.favorites.push({...product, favorite:true});


product.favorite=true;


}



this.saveFavorites();



}









getFavorites():Product[]{


return this.favorites.map(

product=>({...product})

);


}









private saveFavorites(){


localStorage.setItem(

'favorites',

JSON.stringify(this.favorites)

);


}









private loadFavorites():Product[]{



try{


return JSON.parse(

localStorage.getItem('favorites') || '[]'

);



}

catch{


return [];


}



}









// ================================
// SEARCH
// ================================


searchProducts(text:string):Product[]{



const value=text

.trim()

.toLowerCase();





if(!value){


return this.getProducts();


}





return this.products.filter(product=>



product.name.toLowerCase()
.includes(value)


||

product.description.toLowerCase()
.includes(value)


||

product.category.toLowerCase()
.includes(value)



);



}









// ================================
// CATEGORY
// ================================


filterCategory(category:string):Product[]{



if(category.toLowerCase()==='tutti'){


return this.getProducts();


}




return this.products.filter(product=>


product.category.toLowerCase()

===

category.toLowerCase()



);



}







}