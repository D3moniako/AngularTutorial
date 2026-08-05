import { Component, OnInit } from '@angular/core';

import { PlannerService } from '../../core/services/planner.service';
import { CartService } from '../../core/services/cart.service';

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

    private cartService: CartService

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


    this.cartService.add(product);


    alert(
      '🛒 ' + product.name + ' aggiunto al carrello'
    );


  }






  toggleFavorite(product:Product){


    this.plannerService.toggleFavorite(product);



    this.products =
    this.plannerService.getProducts();



    this.filteredProducts =
    [...this.products];


  }



}