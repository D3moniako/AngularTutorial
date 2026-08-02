import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MESSAGES } from '../../constants/messages';
interface Product {
  id: number;

  name: string;

  image: string;

  price: number;

  category: string;

  description: string;

  favorite: boolean;

  badge: string;

  rating: number;
}

interface CartItem {
  product: Product;

  quantity: number;
}

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private router: Router,
  ) {}

  menuOpen: boolean = false;

  email: string = '';

  selectedCategory: string = 'Tutti';

  cartProducts: CartItem[] = [];

  favorites: Product[] = [];

  days: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];

  menuItems = [
    {
      label: 'Home',

      link: '/',

      icon: '🏠',
    },

    {
      label: 'Shop',

      link: '/shop',

      icon: '🛒',
    },

    {
      label: 'Planner',

      link: '/planner',

      icon: '📅',
    },

    {
      label: 'I miei Planner',

      link: '/my-planners',

      icon: '📚',
    },

    {
      label: 'Preferiti',

      link: '/favorites',

      icon: '❤️',
    },

    {
      label: 'About',

      link: '/about',

      icon: '🌸',
    },

    {
      label: 'Contact',

      link: '/contact',

      icon: '✉️',
    },
  ];

  products: Product[] = [
    {
      id: 1,

      name: 'Rose Gold Luxury Planner',

      image: 'assets/images/calendar/rose-gold.jpg',

      price: 14.99,

      category: 'Elegant',

      badge: 'BEST SELLER',

      rating: 5,

      favorite: false,

      description:
        'Planner digitale elegante rosa oro con calendario, obiettivi e gestione quotidiana.',
    },

    {
      id: 2,

      name: 'Dream Life Planner',

      image: 'assets/images/calendar/dream-life.jpg',

      price: 12.99,

      category: 'Lifestyle',

      badge: 'NUOVO',

      rating: 5,

      favorite: false,

      description:
        'Planner creativo per sogni, abitudini, obiettivi e crescita personale.',
    },

    {
      id: 3,

      name: 'Self Care Planner',

      image: 'assets/images/calendar/self-care.jpg',

      price: 9.99,

      category: 'Wellness',

      badge: 'RELAX',

      rating: 5,

      favorite: false,

      description:
        'Organizza routine wellness, gratitudine, salute e momenti dedicati a te.',
    },

    {
      id: 4,

      name: 'Business Woman Planner',

      image: 'assets/images/calendar/business.jpg',

      price: 18.99,

      category: 'Business',

      badge: 'PREMIUM',

      rating: 5,

      favorite: false,

      description:
        'Planner professionale per appuntamenti, lavoro e produttività.',
    },
  ];

  categories = [
    {
      name: 'Tutti',

      icon: '✨',
    },

    {
      name: 'Elegant',

      icon: '🌸',
    },

    {
      name: 'Lifestyle',

      icon: '💖',
    },

    {
      name: 'Wellness',

      icon: '🧘‍♀️',
    },

    {
      name: 'Business',

      icon: '💼',
    },
  ];

  stats = [
    {
      number: '15K+',

      label: 'Clienti felici',
    },

    {
      number: '200+',

      label: 'Planner creati',
    },

    {
      number: '99%',

      label: 'Recensioni positive',
    },
  ];

  reviews = [
    {
      avatar: '👩🏻',

      name: 'Sofia',

      text: 'Il planner più elegante che abbia mai usato. Perfetto su iPad.',
    },

    {
      avatar: '👩🏼',

      name: 'Martina',

      text: 'Finalmente riesco a organizzare lavoro e vita privata.',
    },

    {
      avatar: '👩🏽',

      name: 'Elisa',

      text: 'Grafica bellissima e facilissimo da usare.',
    },
  ];

  faq = [
    {
      q: 'Funziona su iPad?',

      a: 'Si, puoi usarlo con GoodNotes, Notability e app PDF compatibili.',
    },

    {
      q: 'Quando ricevo il planner?',

      a: 'Il download è disponibile subito dopo l acquisto.',
    },

    {
      q: 'Posso stamparlo?',

      a: 'Si, puoi stampare tutte le pagine in formato PDF.',
    },
  ];

  // MENU

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  // CATEGORIE

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Tutti') {
      return this.products;
    }

    return this.products.filter(
      (product) => product.category === this.selectedCategory,
    );
  }

  openProduct(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  // FAVORITI

  toggleFavorite(product: Product) {
    if (!this.userService.isLogged()) {
      this.notificationService.warning(MESSAGES.FAVORITES.LOGIN_REQUIRED);

      this.router.navigate(['/login']);

      return;
    }

    product.favorite = !product.favorite;

    if (product.favorite) {
      this.favorites.push(product);

      this.notificationService.success(MESSAGES.FAVORITES.ADDED);
    } else {
      this.favorites = this.favorites.filter((p) => p.id !== product.id);

      this.notificationService.success(MESSAGES.FAVORITES.REMOVED);
    }
  }

  // CARRELLO

  addCart(product: Product) {
    if (!this.userService.isLogged()) {
      this.notificationService.warning(
        '🔒 Accedi al tuo account per aggiungere prodotti al carrello',
      );

      this.router.navigate(['/login']);

      return;
    }

    // continua codice esistente

    const item = this.cartProducts.find((x) => x.product.id === product.id);

    if (item) {
      item.quantity++;
    } else {
      this.cartProducts.push({
        product: product,

        quantity: 1,
      });
    }

    this.notificationService.success(
      '🛒 ' + product.name + ' aggiunto al carrello',
    );
  }

  get cartCount(): number {
    return this.cartProducts.reduce(
      (total, item) => total + item.quantity,

      0,
    );
  }

  // NEWSLETTER

  subscribe() {
    if (this.email.trim() === '') {
      alert('Inserisci la tua email ✉️');

      return;
    }

    alert('💖 Grazie! Riceverai presto il tuo planner gratuito.');

    this.email = '';
  }

  testNotification() {
    this.notificationService.success('🌸 Notifica DreamCalendar funzionante!');
  }
}
