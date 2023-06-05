import { Component } from '@angular/core';

interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: Product[] = [
    {
      name: 'Producto 1',
      price: 10.99,
      image: 'assets/images/product1.png'
    },
    {
      name: 'Producto 2',
      price: 19.99,
      image: 'assets/images/product2.jpg'
    },
    // Agrega más objetos de productos según tus necesidades
  ];
}
