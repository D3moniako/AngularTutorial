import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({ // il mio decoratore che fa diventare la classe di tipo component , gli passo un oggetto
  selector: 'app-root', // oggetto ha prima chiave selettore , che si riferisce a un conteiner html
  templateUrl: './app.component.html',// che avrà questo template
  styleUrls: ['./app.component.css'] // e questo stile
})
export class AppComponent { // qui invece c'è la logica del mio template

                /////VIEW_CHILD E VARIABILI DI TEMPLATE
  /////VOGLIO PRENDERE I DATI DA UN ELEMNTO HTML SENZA CREARE NEL TS UN VALORE PER OGNI VARIABILE, ESEMPIO SE NEL FORM HO TANTI CAMPI
  ///// CON NGONIT DOVREI CREARE TANTE VARIABILI, MENTRE CON

 @ViewChild('inputSaluti') inputSaluti!:ElementRef<HTMLInputElement>;// Gli dico che mi arriverà un figlio dall'html di nome inputSaluti che nel ts gli do nome inputSaluti e tipo ElementRef, con ! gli dico che non sarà mai

title:string="";
VisibileBoolen:boolean=true;
//////////
  primoCaso:boolean=true; // variabili usate con ng-module e variabili
  secondoCaso:boolean=false;

persone=[ // oggetto per spiegare ngFor e PASSAGGIO DI VARIABILI DA COMPONENTE GENITORE A FIGLIO
  {nome:"luca",cognome:"rossi",isOnline:false,color:"red"},
  {nome:"marco",cognome:"verdi",isOnline:true,color:"green"},
  {nome:"anna",cognome:"gialli",isOnline:false,color:"yellow"},
  {nome:"pino",cognome:"neri",isOnline:true,color:"black"}
]

  numero:number=5;// variabile per testare ng switch

  colori=[
    {scelto:"green"},
    {scelto:"red"},
    {scelto:"grey"},
    {scelto:"blue"}
  ]



  onClick():void{   // questa funzione è passata ad un evento con l'event binding evento tra parentesi () =" metodo che gli passo da typescript  (click)="onclick"
    console.log('hai cliccato il bottone del event binding');

this.persone=[ // metodo usato nell'on change,cambia i valori, all'azionarsi dell'evento
{nome:"ciao",cognome:"rossi",isOnline:false,color:"red"},
{nome:"questoe",cognome:"verdi",isOnline:true,color:"green"},
{nome:"onchange",cognome:"gialli",isOnline:false,color:"yellow"},
{nome:"applicato",cognome:"neri",isOnline:true,color:"black"}
]
  } // ad un evento in html si attiva questo metodo che printa a console una qualcosa

  onClickTitolo(e:any):void {// prende in ingresso una variabile di tipo qualsiasi che printa all'innescarsi di unn evento su html
    console.log(e)

  }

  onClickInput(evento:Event):void {//   IMPORTANTE   CATING IN TYPESCRIPT E Letturs di un dato di un evento all'innescarsi dell'evento tramite EVENT BINDING!!!!!! //
    console.log(evento )
    console.log((<HTMLInputElement>evento.target).value)// e è la nostra variabile in questo caso è un oggetto di angular che passo dal front chiamato $event
                                                         // all'interno di $event ho molti sottooggetti tra cui target che a sua volta contiene sottooggetti tra cui value di mio interesse

                                                         // CON ANY CAPIVA IN AUTOMATICO MA USANDO TYPESCRIPT È MEGLIO SEMPRE SAPERE IL TIPO DEGLI ELEMENTI
                                                         // ORA PERÒ CON il tipo event mi da problemi perchè value non è un tipo event ma un sottooggetto di event
                                                         // Quindi devo castare evento.target con <HtmlInputElement>
                                                         // aggiunta del tipo da cui arriva un <HtmlInputElement>
                                                         // ora che è castato prenderne .value!!! cosi non da errore

   // potrei mandare questi value al backend per fare ricerca realtime
  }
 ///////////////////////////////////////////////////////////////////////////////BINDING BIDIREZIONALE/////////////////////////////////////////////////

 /// QUESTO È ANCORA UN ESEMPIO DI BINDING MONODIREZIONALE ANCHE SE COMPOSTO DA DUE BINDING MONODIREZIONALI
 // prendo input da html tramite event binding all'input faccio partire un metodo che mi cambia la variabile title che poi successivamente con string interpolation passo come contenuto a un elemento html
 // NON È 2WAY BINDING PERCHÈ APPLICATO SU ELEMENTI DIFFERENTI

 modificaTitolo(evento:Event):void {// in questo caso ho legato l'even binding con la string interpolation, avrei potuto anche legare evend binding con propriety binding
  console.log((<HTMLInputElement>evento.target).value)

  this.title=(<HTMLInputElement>evento.target).value; // cambio la variabile globale title che passerò all'html tramite string interpolation{{}}
}


modificaTutto(evento:Event){// in questo caso ho legato l'even binding con la string interpolation, avrei potuto anche legare evend binding con propriety binding

  this.title="ho cliccato sul bottone"
}

onRiceviDati(value:string):void {// in questo caso parte una volta ricevuti i dati dal figlio
  console.log(value)

}

}


