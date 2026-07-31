import {
Component,
OnDestroy
}
from '@angular/core';


import {
Router
}
from '@angular/router';



interface Player {

name:string;

level:number;

xp:number;

coins:number;

score:number;

streak:number;

badges:string[];

}



interface CalendarDay {

day:number;

month:string;

icon:string;

event:string;

special:boolean;

}



interface Badge {

id:number;

name:string;

description:string;

icon:string;

unlocked:boolean;

}




@Component({

selector:'app-pag404',

templateUrl:'./pag404.component.html',

styleUrls:['./pag404.component.css']

})

export class Pag404Component implements OnDestroy {



gameStarted:boolean=false;

gameOver:boolean=false;

victory:boolean=false;


currentGame:
'lostDay'
|
'memory'
|
'quiz'
|null=null;



time:number=60;


private timer:any;



player:Player={

name:'Dreamer',

level:1,

xp:0,

coins:0,

score:0,

streak:0,

badges:[]

};





statistics={

gamesPlayed:0,

daysFound:0,

memoryWins:0,

quizCorrect:0,

bestScore:0

};





months=[

'Gennaio',
'Febbraio',
'Marzo',
'Aprile',
'Maggio',
'Giugno',
'Luglio',
'Agosto',
'Settembre',
'Ottobre',
'Novembre',
'Dicembre'

];




calendarDays:CalendarDay[]=[];


targetDay:number=0;


message:string=
'La pagina perduta del calendario ti aspetta 🌸';





badges:Badge[]=[


{
id:1,
name:'Primo Planner',
description:'Hai iniziato la tua avventura',
icon:'🌱',
unlocked:false
},


{
id:2,
name:'Organizzatore',
description:'Hai trovato 10 giornate',
icon:'📅',
unlocked:false
},


{
id:3,
name:'Dream Master',
description:'Hai superato 500 punti',
icon:'⭐',
unlocked:false
},


{
id:4,
name:'Calendar Legend',
description:'Hai completato tutti i giochi',
icon:'👑',
unlocked:false
}

];





constructor(

private router:Router

){

this.loadGame();

this.generateCalendar();

}





startAdventure(){

this.currentGame='lostDay';

this.gameStarted=true;

this.gameOver=false;

this.victory=false;
this.currentGame='lostDay';

this.statistics.gamesPlayed++;

this.player.score=0;

this.generateCalendar();

this.startTimer();

this.message=
'🌸 Recupera le pagine perdute del planner';

}





startTimer(){


if(this.timer){

clearInterval(this.timer);

}


this.time=60;


this.timer=setInterval(()=>{


this.time--;


if(this.time<=0){

this.endGame();

}


},1000);


}





endGame(){


clearInterval(this.timer);


this.gameOver=true;

this.gameStarted=false;


this.message=
'⏰ Il calendario è scaduto!';


this.saveGame();


}




generateCalendar(){


this.calendarDays=[];


const icons=[

'🌸',
'⭐',
'☕',
'📚',
'💼',
'🎨',
'🌙'

];


const events=[

'Momento creativo',
'Obiettivo giornaliero',
'Pausa relax',
'Studio',
'Lavoro',
'Arte',
'Riposo'

];



for(let i=1;i<=31;i++){


const random=Math.floor(
Math.random()*icons.length
);



this.calendarDays.push({

day:i,

month:'Gennaio',

icon:icons[random],

event:events[random],

special:false

});


}



this.targetDay=
Math.floor(Math.random()*31)+1;


this.calendarDays[
this.targetDay-1
].special=true;


}
// ================================
// SISTEMA PUNTI
// ================================


addScore(value:number){


this.player.score+=value;



if(this.player.score >
this.statistics.bestScore){


this.statistics.bestScore =
this.player.score;

this.updateMissions();

}



this.addXP(value/2);



this.updateMissions();


}






addXP(value:number){


this.player.xp+=value;



if(this.player.xp>=100){



this.player.level++;


this.player.xp=0;



this.message=
'🎉 Nuovo livello raggiunto!';



}



}








// ================================
// LOST DAY GAME
// ================================


combo:number=0;


lastFound:number=-1;



clickDay(day:number){



if(
!this.gameStarted ||
this.gameOver
){

return;

}






if(day===this.targetDay){



this.combo++;



let points=100;




if(this.combo>=3){



points*=2;



this.message=
'🔥 Combo x2! Ottimo lavoro!';



}

else{


this.message=
'🌸 Hai trovato la giornata perduta!';



}




this.addScore(points);



this.statistics.daysFound++;



this.lastFound=day;



this.player.coins+=10;



this.checkBadges();



setTimeout(()=>{


this.lastFound=-1;


},700);




this.generateNextDay();



}

else{



this.combo=0;



this.time-=3;



if(this.time<0){

this.time=0;

}



this.message=
'❌ Giorno sbagliato! -3 secondi';



}




}








generateNextDay(){



this.calendarDays.forEach(day=>{


day.special=false;


});




this.targetDay=
Math.floor(
Math.random()*31
)+1;




this.calendarDays[
this.targetDay-1
].special=true;



}









// ================================
// MEMORY GAME
// ================================



memoryCards:any[]=[];


flippedCards:any[]=[];


memoryMatches:number=0;



memoryLock:boolean=false;





createMemory(){



const values=[


'🌸',

'⭐',

'☕',

'📚',

'💼',

'🎨'


];



this.memoryCards=[];


this.memoryMatches=0;


this.flippedCards=[];




values.forEach(v=>{



this.memoryCards.push({


value:v,


hidden:true,


matched:false


});




this.memoryCards.push({


value:v,


hidden:true,


matched:false


});



});




this.shuffleCards();



}







shuffleCards(){



this.memoryCards.sort(()=>


Math.random()-.5


);



}








startMemory(){

this.currentGame='memory';

this.gameStarted=true;

this.createMemory();

this.memoryMatches=0;

this.flippedCards=[];

this.message=
'🧠 Trova tutte le coppie del planner';

}








flipCard(index:number){



if(this.memoryLock){

return;

}



const card=this.memoryCards[index];




if(
card.matched ||
!card.hidden
){

return;

}



card.hidden=false;



this.flippedCards.push(card);





if(this.flippedCards.length===2){



this.memoryLock=true;



setTimeout(()=>{


this.checkMemory();



},600);



}



}








checkMemory(){



const first=this.flippedCards[0];


const second=this.flippedCards[1];





if(first.value===second.value){



first.matched=true;


second.matched=true;



this.memoryMatches++;



this.addScore(50);



this.message=
'✨ Coppia trovata!';


this.memoryMatches=0;

if(this.memoryMatches===6){



this.statistics.memoryWins++;


this.player.coins+=50;



this.message=
'🏆 Memory completato!';



this.checkBadges();



}



}

else{



first.hidden=true;


second.hidden=true;



this.message=
'❌ Coppia sbagliata';



}





this.flippedCards=[];


this.memoryLock=false;



}
// ================================
// QUIZ PLANNER
// ================================


quizIndex:number=0;


quizScore:number=0;



questions=[


{

question:
'Quale strumento aiuta ad organizzare meglio la giornata?',


answers:[

'Un planner',

'Il caos',

'Mai programmare'

],


correct:0


},



{

question:
'Quando scarichi un planner digitale?',


answers:[

'Dopo settimane',

'Subito dopo acquisto',

'Mai'

],


correct:1


},



{

question:
'Un obiettivo scritto è più facile da seguire?',


answers:[

'Si',

'No',

'Mai'

],


correct:0


}


];







startQuiz(){



this.currentGame='quiz';


this.gameStarted=true;


this.quizIndex=0;


this.quizScore=0;



this.message=
'❓ Rispondi alle domande DreamCalendar';



}








answerQuiz(index:number){



if(
this.quizIndex>=this.questions.length
){

return;

}




const question =
this.questions[this.quizIndex];





if(index===question.correct){



this.quizScore++;


this.addScore(75);


this.statistics.quizCorrect++;



this.message=
'✅ Risposta corretta!';



}

else{



this.message=
'❌ Risposta sbagliata';



}






this.quizIndex++;





if(
this.quizIndex>=this.questions.length
){


this.finishQuiz();


}



}







finishQuiz(){



if(
this.quizScore===this.questions.length
){



this.player.coins+=100;



this.message=
'👑 Quiz perfetto!';



}



this.checkBadges();


this.updateMissions();



}










// ================================
// MISSIONI
// ================================



missions=[


{

id:1,

title:'Trova 5 giornate perdute',

goal:5,

progress:0,

reward:100,

completed:false

},



{

id:2,

title:'Ottieni 500 punti',

goal:500,

progress:0,

reward:200,

completed:false

},



{

id:3,

title:'Completa il Memory Planner',

goal:1,

progress:0,

reward:150,

completed:false

},



{

id:4,

title:'Completa il Quiz',

goal:3,

progress:0,

reward:250,

completed:false

}



];









updateMissions(){



this.missions.forEach(mission=>{



switch(mission.id){



case 1:


mission.progress =
this.statistics.daysFound;


break;



case 2:


mission.progress =
this.player.score;


break;




case 3:


mission.progress =
this.statistics.memoryWins;


break;




case 4:


mission.progress =
this.statistics.quizCorrect;


break;



}






if(

mission.progress>=mission.goal

&&

!mission.completed

){



mission.completed=true;



this.player.coins+=mission.reward;



this.addXP(50);



this.message=
'🎁 Missione completata: '
+
mission.title;



}



});



}












// ================================
// BADGE SYSTEM
// ================================


checkBadges(){



this.badges.forEach(badge=>{



if(badge.unlocked){

return;

}




switch(badge.id){



case 1:



if(
this.statistics.gamesPlayed>=1
){


this.unlockBadge(badge);


}


break;






case 2:



if(
this.statistics.daysFound>=10
){


this.unlockBadge(badge);


}


break;






case 3:



if(
this.player.score>=500
){


this.unlockBadge(badge);


}


break;






case 4:



if(

this.statistics.daysFound>0

&&

this.statistics.memoryWins>0

&&

this.statistics.quizCorrect>0

){


this.unlockBadge(badge);


}



break;



}



});



}








unlockBadge(badge:Badge){



badge.unlocked=true;



this.player.badges.push(

badge.name

);



this.player.coins+=100;



this.message=

'🏆 Nuovo badge ottenuto: '

+

badge.icon

+

' '

+

badge.name;



}











// ================================
// SHOP PREMI
// ================================



rewards=[



{

name:'Planner Rosa',

icon:'🌸',

cost:100

},



{

name:'Tema Luxury',

icon:'✨',

cost:200

},



{

name:'Calendario Oro',

icon:'👑',

cost:500

}



];







buyReward(index:number){



const reward=this.rewards[index];




if(
this.player.coins < reward.cost
){



this.message=
'❌ Non hai abbastanza stelle';



return;

}





this.player.coins-=reward.cost;



this.message=
'🎁 Hai ottenuto '
+
reward.name;



}
// ================================
// FINE AVVENTURA
// ================================


completeAdventure(){



this.victory=true;


this.gameStarted=false;


if(this.timer){

clearInterval(this.timer);

}



this.addScore(500);


this.player.coins+=200;



this.checkBadges();


this.updateMissions();



this.message=
'🌸 Avventura completata! Sei un Dream Master!';



this.saveGame();



}









// ================================
// NAVIGAZIONE
// ================================



goHome(){


this.router.navigate(['/']);


}






restart(){



this.startAdventure();



}









// ================================
// SALVATAGGIO
// ================================



saveGame(){



const data={



player:this.player,



statistics:this.statistics,



badges:this.badges,



missions:this.missions



};






localStorage.setItem(


'dreamCalendar404Save',


JSON.stringify(data)


);



}












// ================================
// CARICAMENTO
// ================================



loadGame(){



const data =

localStorage.getItem(

'dreamCalendar404Save'

);





if(!data){

return;

}





try{



const save=

JSON.parse(data);





this.player =

save.player || this.player;





this.statistics =

save.statistics || this.statistics;





this.badges =

save.badges || this.badges;





this.missions =

save.missions || this.missions;





}

catch(e){



console.log(

'Salvataggio non valido'

);



}



}











// ================================
// RESET
// ================================



resetGame(){



localStorage.removeItem(

'dreamCalendar404Save'

);



location.reload();



}













// ================================
// EXTRA GAME SYSTEM
// ================================



lives:number=3;


hints:number=3;


timeBonus:number=2;


shield:boolean=false;




events:any[]=[



{

icon:'🌸',

text:'Hai trovato un fiore magico'

},



{

icon:'⭐',

text:'Hai trovato una stella planner'

},



{

icon:'📚',

text:'Hai trovato una pagina perduta'

}



];




bonusDay:number=0;


correctDay:number=0;












// ================================
// CICLO VITA
// ================================


ngOnDestroy(){



if(this.timer){



clearInterval(this.timer);



}



}










// ================================
// GETTERS
// ================================



get level(){



return this.player.level;



}





get xp(){



return this.player.xp;



}









getDayName(day:number){



const names=[



'Lun',

'Mar',

'Mer',

'Gio',

'Ven',

'Sab',

'Dom'



];





return names[(day-1)%7];



}



}