import { Component, OnInit } from '@angular/core';
import { ServizioPortaService } from 'src/app/service/servizio-porta.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  persone:any;
  constructor( private servizioProva :ServizioPortaService) { }

  ngOnInit(): void {
    this.persone=this.servizioProva.getPersone()
  }

}
