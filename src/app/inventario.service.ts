import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
export interface Producto {
  $key?: string;
  nombre: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private productosRef: any;

  constructor(private db: AngularFireDatabase) {
    this.productosRef = this.db.list('/productos');
  }
  getProductosRef(): AngularFireList<Producto> {
    return this.productosRef;
  }
  eliminarProducto(key: string) {
    this.productosRef.remove(key)
      .catch((error: any) => {
        console.error('Error al eliminar el producto:', error);
      });
  }
  
  
  agregarProducto(producto: Producto) {
    this.productosRef.push(producto)
      .catch((error: any) => {
        console.error('Error al agregar el producto:', error);
      });
  }
  modificarProducto(key: string, producto: Producto) {
    return this.productosRef.update(key, producto)
      .catch((error: any) => {
        console.error('Error al modificar el producto:', error);
      });
  }
  

  obtenerProductos(): Observable<Producto[]> {
    return this.productosRef.valueChanges();
  }
}
