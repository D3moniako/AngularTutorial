import { Component, OnInit } from '@angular/core';
import { interval, Observable, Observer } from 'rxjs';
// con comando ng g c , mi crea una classe a cui applica un decoratore component in cui crea template css e selettori con nome uguale al component 

@Component({
  selector: 'app-componente-prova',
  templateUrl: './componente-prova.component.html',
  styleUrls: ['./componente-prova.component.css']
})
export class ComponenteProvaComponent implements OnInit { // implementa anche Interfaccia OnInit che è la prima cosa che viene avviata
//DIFFERENZA RISPETTO APPCOMPONENT SONO ONINIT E COSTRUTTORE



  constructor() { } // un costruttore dove mettere i vari elementi della classe
  cani:any=[ // array di any quindi ci posso mettere tutto, non devo mettere il tipo all'interno ma solo chiave valore
    {
    nome:'Rocky',   //
    razza:'bastardino',
    eta:4

    }
    ,{
    nome:'Kiba',
    razza:'mastino',
    eta:6}
  ]




   testo:string="ciaoooooo dal ts commponent, questa è una string interpolation, posso richiamare qualsiasi cosa che ritorna stringa, quindi stringhe stessi  o metodi che ritornano stringhe"
   primoNome:string="Souhail"
   secondoNome:string="Luca"
   numero:number= 5



   eDisabilitato:boolean=false;// variabile che uso per binding proprietes nella proprieta del conteiner html a cui la applico 
                               // se poi sempre dal tst tramite event metodi o direttive nell'html voglio posso far in modo che quella variabile cambi 
  immagine:string = ""; // variabile che conterrà le immagini usata con biding proprietes

  immagine1:string="https://static.ohga.it/wp-content/uploads/sites/24/2021/08/iStock-933914464.jpg"
  immagine2:string="https://www.tuttogreen.it/wp-content/uploads/2021/01/shutterstock_547175674.jpg"
   
  

  ngOnInit(): void { // dell'interfaccia OnInit  crea un metodo ngOnInit essendo un interfaccia devo implementare tutti i suoi metoidi,
                    // in questo caso vuoto perchè lo devo riempire io
                    // ngOnInit non torna nulla perchè si deve occupare solo di far visuallizzare
  
  //AD AVVIO PAGINA GRAZIE ad ngONinit ogni due secondi 
   //tramite set intervall nega lo stato della variabile di tipo boolean di nome eDisabilitato
   // mi ritorno con setInterbval che è un observable la variabile 

   // seccessivamente tramite binding propietes la variabile è applicata come propietà html e viene cambiata ogni  volta
   //               
                    let counter=0;
                    setInterval(()=>{return this.eDisabilitato=!this.eDisabilitato},2000);
                    
                    setInterval(
                   ()=>{
                     
                      if ((counter%2 ==0  && counter<=10) ){ // se pari e minore venti
                         this.immagine=this.immagine1   // setIntervall(cosaritorna,ogniquando)
                      
                         console.log(counter+" e' pari =>giraffa");

                        }
                        
                     else if (((counter%2 ==1  && counter<=10)) || ( (counter%2==1 && counter<=15 ) )){ // se dispati

                               this.immagine=this.immagine2 
                               console.log(counter+" e' dispari =>leone");

                     }  
                     else if (counter>=15){ // se maggiore di 20

                      this.immagine=this.immagine2 
                      console.log(counter+" e' maggiore di 15 =>immagine di default leone");

                    }  
                     
                     // mostra sotto i diecisecondi le immagini alternate , sopra solo una delle due

                       counter++;// il retrun o è vuoto o il tempo
                    }

                   
                    ,1000);

                  

                  }
 

  //SE VOLESSI FARE UN COMPONENT A MANO BASTA CREARE TRE FILE CON TS COSI E AGGIORNANDO L'APP.MODULE.TS REFERENZIANDO IL COMPONENT DATO CHE LI SI DEVE LISTARE

                                         ///5 CICLO DI VITA DEI COMPONENTI ANGULAR///////////


                                         



}
                                        //8 STRING INTERPOLATION//
// POSSO USARE NEL CORPO DELL'HTML DELLE VARIABILI METODI O OGGETTI  CHE RITORNANO UNA STRINGA PER FARLO USO {{ ROBACHERITORNASTRINA O STRINGA STESSA}} 

                                        //9 PROPRIETY BINDING//
 // POSSO CAMBIARE UNA PROPIETA DEL MIO CONTEINER STILE O ALTRO
 
 
