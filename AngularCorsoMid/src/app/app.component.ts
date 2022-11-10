import { Component } from '@angular/core';

@Component({ // il mio decoratore che fa diventare la classe di tipo component , gli passo un oggetto
  selector: 'app-root', // oggetto ha prima chiave selettore , che si riferisce a un conteiner html
  templateUrl: './app.component.html',// che avrà questo template
  styleUrls: ['./app.component.css'] // e questo stile
})
export class AppComponent { // qui invece c'è la logica del mio template
  title = 'AngularCorsoMid'; // title verrà richiamato tramite binding nell'html


  onClick():void{   // questa funzione è passata ad un evento con l'event binding evento tra parentesi () =" metodo che gli passo da typescript  (click)="onclick"
    console.log('hai cliccato il bottone del event binding');
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
}


