import { Injectable, OnInit } from '@angular/core';

@Injectable({ // è iniettabile negli altri componenti
  providedIn: 'root' // da dove è reso disponibile l'accesso dal root quindi chiunque può chiamarlo
})
export class ServizioPortaService  implements OnInit{
  persone=[
  {nome:"luca",cognome:"rossi",isOnline:false,color:"red"},
  {nome:"marco",cognome:"verdi",isOnline:true,color:"green"},
  {nome:"anna",cognome:"gialli",isOnline:false,color:"yellow"},
  {nome:"pino",cognome:"neri",isOnline:true,color:"black"}
]
// specificare nel costrutto che è private cosi che crei la roba tramite costruttore

  constructor( private servizioPorta: ServizioPortaService) { }
  ngOnInit(): void {
    console.log('siamo in prova component '+this.servizioPorta.persone)
  }

  getPersone(){
    return this.persone;
  }
// metodo usato per app-routing con parametro
  getPersona(index:number){ // ritorna una specifica persona dell'oggetto persone in base ad un indice che gli passo
    return this.persone[index];
  }

}
