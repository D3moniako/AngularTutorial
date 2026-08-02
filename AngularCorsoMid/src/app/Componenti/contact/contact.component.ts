import { Component } from '@angular/core';

interface ContactCard {
  icon: string;
  title: string;
  text: string;
  link: string;
}

interface FAQ {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-contact',

  templateUrl: './contact.component.html',

  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';

  email: string = '';

  message: string = '';

  sent: boolean = false;

  contactCards: ContactCard[] = [
    {
      icon: '💌',
      title: 'Email',
      text: 'support@dreamcalendar.com',
      link: 'mailto:support@dreamcalendar.com',
    },

    {
      icon: '📱',
      title: 'Social',
      text: '@dreamcalendar',
      link: '#',
    },

    {
      icon: '🕒',
      title: 'Assistenza',
      text: 'Lun-Ven 9:00-18:00',
      link: '#',
    },

    {
      icon: '🌸',
      title: 'Community',
      text: 'Unisciti alle planner lovers',
      link: '/community',
    },
  ];

  faq: FAQ[] = [
    {
      question: 'Quanto tempo impiego a ricevere il planner?',
      answer: 'Il prodotto digitale viene inviato subito dopo l’acquisto.',
    },

    {
      question: 'Su quali dispositivi posso usarlo?',
      answer: 'Funziona su iPad, tablet, smartphone e computer.',
    },

    {
      question: 'Posso chiedere un planner personalizzato?',
      answer: 'Si, contattaci e creeremo una soluzione su misura.',
    },

    {
      question: 'Posso stampare il calendario?',
      answer: 'Certamente, tutti i file sono ottimizzati anche per stampa.',
    },
  ];

  social = [
    {
      icon: '📸',
      name: 'Instagram',
      url: '#',
    },

    {
      icon: '📌',
      name: 'Pinterest',
      url: '#',
    },

    {
      icon: '🎵',
      name: 'TikTok',
      url: '#',
    },
  ];

  sendMessage() {
    if (this.name && this.email && this.message) {
      this.sent = true;

      this.name = '';

      this.email = '';

      this.message = '';
    }
  }

  resetMessage() {
    this.sent = false;
  }
}
