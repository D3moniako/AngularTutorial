import { Component } from '@angular/core';
import { PlannerService} from '../../services/planner.service';
import { Product } from '../../models/product';
@Component({

selector:'app-planner',

templateUrl:'./planner.component.html',

styleUrls:['./planner.component.css']

})


export class PlannerComponent {



products:Product[]=[];



constructor(

private plannerService:PlannerService

){}



ngOnInit(){


this.products=this.plannerService.getProducts();


}



categories=[


'Daily Planner',

'Wellness',

'Business',

'Goals'


];



}