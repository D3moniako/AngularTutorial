import { Product } from './product';



export interface Order {


id:number;



userId:number;



// prodotti acquistati

products:Product[];



// totale pagato

total:number;



// data acquisto

purchaseDate:string;



// stato ordine

status:
'PAGATO'
|
'IN_ATTESA'
|
'ANNULLATO'
|
'COMPLETED'
|
'PENDING'
|
'CANCELLED';

// download disponibili

downloadAvailable:boolean;





// informazioni cliente

customerName?:string;

customerEmail?:string;

customerAddress?:string;





// futuro pagamento

paymentId?:string;



}