export interface Review {

id:number;

user:string;

rating:number;

comment:string;

date:string;

verified:boolean;

}



export interface Product {


id:number;


name:string;


image:string;


price:number;


category:string;


description:string;


badge:string;


rating:number;


favorite:boolean;


downloadUrl?:string;



reviews?:Review[];


}