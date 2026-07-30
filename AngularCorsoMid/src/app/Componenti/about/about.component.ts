import { Component } from '@angular/core';


@Component({

selector:'app-about',

templateUrl:'./about.component.html',

styleUrls:['./about.component.css']

})


export class AboutComponent {



values=[


{

icon:'🌸',

title:'Design elegante',

text:'Planner creati con colori delicati e uno stile premium.'

},


{

icon:'📱',

title:'Pensati per iPad',

text:'Compatibili con GoodNotes, Notability e PDF.'

},


{

icon:'✨',

title:'Organizzazione semplice',

text:'Trasforma obiettivi e sogni in piccoli passi quotidiani.'

}


];







team=[


{

name:'DreamCalendar Studio',

text:'Un laboratorio digitale dedicato alla creatività, alla pianificazione e all organizzazione personale.'

}



];






stats=[


{

number:'100%',

label:'Digitale'

},


{

number:'24/7',

label:'Accesso ai planner'

},


{

number:'PDF',

label:'Formato universale'

}


];



}