import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service';
import { PlannerService } from '../../core/services/planner.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {


  orders:any[] = [];

  filteredOrders:any[] = [];

  selectedOrder:any = null;


  totalSpent = 0;

  downloadCount = 0;

  availableDownloads = 0;


  searchText = '';

  filter = 'ALL';



  constructor(

    private userService: UserService,

    private plannerService: PlannerService

  ) {}



  ngOnInit() {

    this.loadOrders();

  }





  loadOrders(){


    /*
      TEMPORANEO LOCAL STORAGE

      FUTURO:

      GET /api/orders/user/{id}

    */


    const saved =
    localStorage.getItem('orders');



    this.orders =
    saved ? JSON.parse(saved) : [];



    this.filteredOrders =
    [...this.orders];



    this.calculateStats();

  }






  calculateStats(){


    this.totalSpent =
    this.orders.reduce(

      (sum,o)=> sum + (o.total || 0),

      0

    );



    this.downloadCount =
    this.orders.reduce(

      (sum,o)=> sum + (o.downloads || 0),

      0

    );



    this.availableDownloads =
    this.orders.length;


  }






  applyFilters(){


    let result =
    [...this.orders];



    if(this.filter !== 'ALL'){


      result =
      result.filter(

        o=>o.status === this.filter

      );


    }




    if(this.searchText){


      const text =
      this.searchText.toLowerCase();



      result =
      result.filter(o=>


        String(o.id)

        .includes(text)


        ||


        o.status

        ?.toLowerCase()

        .includes(text)


      );


    }



    this.filteredOrders =
    result;


  }







  downloadOrder(order:any){


    if(order.products?.length){


      const product =
      order.products[0];


      this.plannerService

      .downloadPlanner(product);


    }


  }







  openDetails(order:any){


    this.selectedOrder =
    order;


  }





  closeDetails(){


    this.selectedOrder =
    null;


  }



}