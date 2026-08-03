import { Component, OnInit } from '@angular/core';

import { BotService } from './service/bot.service';

import { UserService } from '../services/user.service';

import { User } from '../models/user';



@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent implements OnInit {


  userMessage = '';


  messages: {

    sender: string;
    text: string;

  }[] = [];



  loading = false;



  currentUser: User | null = null;

  username = '';

  isLogged = false;




  constructor(

    private botService: BotService,

    private userService: UserService

  ) {}





  ngOnInit(): void {


    this.loadUser();



    // aggiorna automaticamente se cambia login/logout

    this.userService.user$.subscribe(user => {


      this.currentUser = user;


      this.loadUser();


    });


  }






  loadUser(){


    this.currentUser =
      this.userService.getCurrentUser();



    if(this.currentUser){


      this.isLogged = true;


      this.username =
        this.currentUser.name;


    }else{


      this.isLogged = false;


      this.username = '';

    }


  }








  async sendMessage() {



    if(!this.isLogged){


      this.messages.push({

        sender:'BOT',

        text:
        '🔒 Devi effettuare il login per utilizzare DreamCalendar AI.'

      });


      return;


    }





    if (!this.userMessage.trim()) {

      return;

    }





    const question = this.userMessage;





    this.messages.push({

      sender:'USER',

      text:question

    });





    this.userMessage = '';

    this.loading = true;





    try {



      const answer =

        await this.botService.askBot(question);





      this.messages.push({

        sender:'BOT',

        text:answer

      });





    } catch(error) {



      console.error(error);



      this.messages.push({

        sender:'BOT',

        text:
        'Errore nel collegamento con il servizio AI.'

      });


    }





    this.loading = false;



  }



}