import { Injectable } from '@angular/core';

import { Product, Review } from '../models/product';



@Injectable({
providedIn:'root'
})


export class PlannerService {



private readonly ADMIN_KEY = 'adminProducts';

private readonly FAVORITES_KEY = 'favorites';

private readonly REVIEWS_KEY = 'plannerReviews';





private products:Product[] = [


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
downloadUrl:'assets/downloads/rose-gold-planner.pdf',

reviews:[

{
id:1,
user:'Sara',
rating:5,
comment:'Planner bellissimo, elegante e facile da usare.',
date:'2026-07-30',
verified:true
},

{
id:2,
user:'Giulia',
rating:5,
comment:'Perfetto con GoodNotes.',
date:'2026-07-30',
verified:false
}

]

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
downloadUrl:'assets/downloads/dream-life-planner.pdf',

reviews:[

{
id:3,
user:'Elena',
rating:5,
comment:'Colorato e molto motivante.',
date:'2026-07-30',
verified:true
},

{
id:4,
user:'Laura',
rating:4,
comment:'Ottimo per pianificare gli obiettivi.',
date:'2026-07-30',
verified:true
}

]

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
downloadUrl:'assets/downloads/self-care-planner.pdf',
reviews:[

{
id:5,
user:'Anna',
rating:5,
comment:'Mi aiuta a organizzare la giornata.',
date:'2026-07-30',
verified:true
}

]

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
downloadUrl:'assets/downloads/business-planner.pdf',

reviews:[

{
id:6,
user:'Maria',
rating:5,
comment:'Perfetto per lavoro e appuntamenti.',
date:'2026-07-30',
verified:true
}

]

}


];





private favorites:Product[] =
this.loadFavorites();






constructor(){


this.loadAdminProducts();

this.loadReviews();


}






// ===============================
// ADMIN STORAGE
// ===============================



private saveProducts(){


const adminProducts =
this.getOnlyAdminProducts();



localStorage.setItem(

this.ADMIN_KEY,

JSON.stringify(adminProducts)

);


console.log(
'ADMIN PRODUCTS SALVATI:',
adminProducts
);


}






private loadAdminProducts(){



const saved =
localStorage.getItem(this.ADMIN_KEY);



if(!saved){

return;

}



try{


const adminProducts:Product[] =
JSON.parse(saved);



adminProducts.forEach(product=>{


const exists =
this.products.some(
p=>p.id===product.id
);



if(!exists){

this.products.push(product);

}


});



}

catch{


console.log(
'Errore caricamento admin products'
);


}



}







private getOnlyAdminProducts():Product[]{


const baseIds=[1,2,3,4];


return this.products.filter(

p=>!baseIds.includes(p.id)

);


}






getAdminProducts():Product[]{


return this.getOnlyAdminProducts();

}





// ===============================
// CREATE
// ===============================



addPlanner(product:Product){



const newProduct:Product={


...product,


id:Date.now(),


favorite:false,


rating:0,


reviews:[],


badge:product.badge || 'NUOVO',


category:
product.category || 'Altro'


};



this.products.push(newProduct);



this.saveProducts();


}






addProduct(product:Product){

this.addPlanner(product);

}
// ===============================
// LETTURA PRODOTTI
// ===============================



getProducts():Product[]{


return this.products.map(product=>({


...product,


reviews:product.reviews || [],


favorite:this.isFavorite(product.id)



}));


}







getProduct(id:number):Product|undefined{



const product=this.products.find(

p=>p.id===id

);



if(!product){

return undefined;

}



return {


...product,


reviews:product.reviews || [],


favorite:this.isFavorite(product.id)



};


}






// ===============================
// PREFERITI
// ===============================



toggleFavorite(product:Product){



const index=this.favorites.findIndex(

p=>p.id===product.id

);




if(index!==-1){


this.favorites.splice(index,1);


}

else{


this.favorites.push({

...product,

favorite:true

});


}



this.saveFavorites();



}







getFavorites():Product[]{



return this.favorites.map(product=>({


...product,


favorite:true


}));


}







isFavorite(id:number):boolean{


return this.favorites.some(

p=>p.id===id

);


}







private saveFavorites(){



localStorage.setItem(

this.FAVORITES_KEY,

JSON.stringify(this.favorites)

);


}







private loadFavorites():Product[]{


try{


return JSON.parse(

localStorage.getItem(this.FAVORITES_KEY) || '[]'

);


}

catch{


return [];


}


}







// ===============================
// RECENSIONI
// ===============================



addReview(productId:number, review:Review){



const product=this.products.find(

p=>p.id===productId

);




if(!product){

return;

}




if(!product.reviews){

product.reviews=[];

}




product.reviews.push(review);



this.updateRating(product);



this.saveReviews();



}








private updateRating(product:Product){



if(!product.reviews || product.reviews.length===0){

product.rating=0;

return;

}




const total=product.reviews.reduce(

(sum,r)=>sum+r.rating,

0

);




product.rating=Math.round(

total / product.reviews.length

);



}







private saveReviews(){



localStorage.setItem(

this.REVIEWS_KEY,

JSON.stringify(

this.products.map(p=>({

id:p.id,

reviews:p.reviews

}))

)

);



}







private loadReviews(){



const saved=

localStorage.getItem(this.REVIEWS_KEY);



if(!saved){

return;

}



try{


const data=JSON.parse(saved);



data.forEach((item:any)=>{



const product=this.products.find(

p=>p.id===item.id

);



if(product){


product.reviews=item.reviews;


this.updateRating(product);


}



});



}

catch{


console.log(

'Errore caricamento recensioni'

);


}



}








// ===============================
// RICERCA
// ===============================



searchProducts(text:string):Product[]{



const value=text.trim().toLowerCase();



if(!value){


return this.getProducts();


}





return this.getProducts().filter(product=>



product.name.toLowerCase().includes(value)



||



product.description.toLowerCase().includes(value)



||



product.category.toLowerCase().includes(value)



);



}








// ===============================
// CATEGORIE
// ===============================



filterCategory(category:string):Product[]{



if(category.toLowerCase()==='tutti'){


return this.getProducts();


}






return this.getProducts().filter(product=>



product.category.toLowerCase()

===

category.toLowerCase()



);



}







// ===============================
// ADMIN CRUD
// ===============================



deleteProduct(id:number){



const baseIds=[1,2,3,4];



if(baseIds.includes(id)){


console.log(

'Impossibile eliminare prodotto base'

);


return;


}




this.products=this.products.filter(

p=>p.id!==id

);



this.saveProducts();



}







updateProduct(product:Product){



const index=this.products.findIndex(

p=>p.id===product.id

);




if(index!==-1){



this.products[index]={

...product,

reviews:product.reviews || []

};



this.saveProducts();



}



}






}