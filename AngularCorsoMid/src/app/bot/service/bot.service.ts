import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BotService {


  private genAI: GoogleGenerativeAI;



  constructor() {


    console.log(
      'Lunghezza chiave Gemini:',
      environment.geminiApiKey.length
    );


    console.log(
      'Inizio chiave Gemini:',
      environment.geminiApiKey.substring(0, 5)
    );



    if (!environment.geminiApiKey) {

      throw new Error(
        'Chiave Gemini non configurata in environment.ts'
      );

    }



    this.genAI = new GoogleGenerativeAI(
      environment.geminiApiKey
    );


  }




  async askBot(question: string): Promise<string> {


    try {


      const model =
        this.genAI.getGenerativeModel({

          model: 'gemini-flash-latest'

        });




      const prompt = `

Sei il bot ufficiale di DreamCalendar 🌸.

DreamCalendar è un negozio online di planner digitali.

Aiuta gli utenti con:

- informazioni sui planner digitali
- caratteristiche dei prodotti
- utilizzo del sito
- acquisto dei planner
- download dei file
- problemi comuni del sito


Regole importanti:

- Rispondi sempre in italiano.
- Non inventare prodotti, prezzi o caratteristiche.
- Se non conosci una risposta invita l'utente a contattare l'assistenza.
- Mantieni un tono gentile, professionale e semplice.


Domanda dell'utente:

${question}


Risposta:

`;



      const result =
        await model.generateContent(prompt);



      return result.response.text();



    } catch (error: any) {


      console.error(
        'Errore Gemini completo:',
        error
      );


      console.error(
        'Messaggio:',
        error?.message
      );



      return 'Mi dispiace, al momento non riesco a rispondere. Riprova più tardi.';


    }


  }


}