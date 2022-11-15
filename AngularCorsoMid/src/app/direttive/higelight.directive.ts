import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHigelight]' // ha solo il selettore  del elemnto html ,senza html o css . essendo pura logica
})
export class HigelightDirective {

  @Input() appHigelight='';

  constructor(private elemento:ElementRef) {
/*     this.elemento.nativeElement.style.backgroundColor ='yellow';
 */
  }
  @HostListener('mouseEnter') onMouseEnter(){
/*     this.elemento.nativeElement.style.backgroundColor ='yellow';
 */this.cambiaColore(this.appHigelight);// vogliamo che i dati siano passati da componente figlio a padre allora uso @input

  }

  @HostListener('mouseLeave') onMouseLeave(){
/*     this.elemento.nativeElement.style.backgroundColor ='transparent';
 */
   this.cambiaColore('transparent');
  }

  cambiaColore(colore:string){
   this.elemento.nativeElement.style.backgroundColor =colore;
  }
}
