/*
========================================================

APP COMPONENT ORIGINALE - APPUNTI CORSO ANGULAR

Questa parte era usata per studiare:

- Decoratore @Component
- ViewChild
- ElementRef
- Event Binding
- Property Binding
- String Interpolation
- Two Way Binding
- ngFor
- ngSwitch
- Passaggio dati genitore/figlio

NON SERVE NEL PROGETTO DREAMCALENDAR

Viene mantenuta come riferimento.

========================================================


import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({

selector:'app-root',

templateUrl:'./app.component.html',

styleUrls:['./app.component.css']

})


export class AppComponent {


@ViewChild('inputSaluti')
inputSaluti!:ElementRef<HTMLInputElement>;



title:string="";

VisibileBoolen:boolean=true;


primoCaso:boolean=true;

secondoCaso:boolean=false;


colore='purple';



persone=[

{
nome:"luca",
cognome:"rossi",
isOnline:false,
color:"red"
},

{
nome:"marco",
cognome:"verdi",
isOnline:true,
color:"green"
},

{
nome:"anna",
cognome:"gialli",
isOnline:false,
color:"yellow"
},

{
nome:"pino",
cognome:"neri",
isOnline:true,
color:"black"
}

];



numero:number=5;



colori=[

{scelto:"green"},

{scelto:"red"},

{scelto:"grey"},

{scelto:"blue"}

];




onClick(){

console.log('click');

}



onClickTitolo(e:any){

console.log(e);

}




onClickInput(evento:Event){

console.log(

(<HTMLInputElement>evento.target).value

);

}




modificaTitolo(evento:Event){

this.title=

(<HTMLInputElement>evento.target).value;

}




modificaTutto(){

this.title=

"ho cliccato sul bottone";

}




onRiceviDati(value:string){

console.log(value);

}



}


========================================================

FINE APPUNTI

========================================================

*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DreamCalendar';
}
