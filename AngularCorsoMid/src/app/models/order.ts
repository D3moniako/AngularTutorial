import { Product } from './product';
export interface Order {


id:number;


userId:number;


products:Product[];


total:number;


purchaseDate:string;


status:string;


downloadAvailable:boolean;


// futuro pagamento
paymentId?:string;


// futuro indirizzo fatturazione
customerEmail?:string;

customerName?:string;


customerAddress?:string;
}