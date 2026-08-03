import { Component } from '@angular/core';
import { BotService } from './service/bot.service';


@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.css']
})
export class BotComponent {


  userMessage = '';



  messages: {

    sender: string;
    text: string;

  }[] = [];



  loading = false;



  constructor(
    private botService: BotService
  ) {}




  async sendMessage() {


    if (!this.userMessage.trim()) {

      return;

    }



    const question = this.userMessage;



    this.messages.push({

      sender: 'USER',
      text: question

    });



    this.userMessage = '';

    this.loading = true;



    try {


      const answer =
        await this.botService.askBot(question);



      this.messages.push({

        sender: 'BOT',
        text: answer

      });



    } catch(error) {


      console.error(error);



      this.messages.push({

        sender: 'BOT',
        text: 'Errore nel collegamento con il servizio AI.'

      });


    }



    this.loading = false;


  }


}