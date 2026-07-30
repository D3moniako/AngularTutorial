import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';

import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';


describe('ProductsComponent', () => {


let component: ProductsComponent;

let fixture: ComponentFixture<ProductsComponent>;



beforeEach(async () => {


await TestBed.configureTestingModule({


declarations:[

ProductsComponent

],


imports:[

RouterTestingModule,

FormsModule

]


})

.compileComponents();



});






beforeEach(()=>{


fixture = TestBed.createComponent(ProductsComponent);


component = fixture.componentInstance;


fixture.detectChanges();


});






it('should create',()=>{


expect(component).toBeTruthy();


});



});