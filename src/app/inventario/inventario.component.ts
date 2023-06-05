import { Component, OnInit } from '@angular/core';
import { InventarioService, Producto } from '../inventario.service';
import { AngularFireList } from '@angular/fire/compat/database';
import { take } from 'rxjs';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  productoSeleccionado: Producto | null = null;
  mostrarFormularioModificacion = false;
  productos: Producto[] = [];
  nombreModificado: string = '';
  precioModificado: string = '';
  stockModificado: string = '';
  productosRef: AngularFireList<Producto>;
  constructor(private inventarioService: InventarioService) {
    this.productosRef = this.inventarioService.getProductosRef();
  }
  ngOnInit() {
    this.inventarioService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  agregarProducto() {
    const nuevoProducto = {
      nombre: 'Nuevo producto',
      precio: 0,
      stock: 0
    };
    this.inventarioService.agregarProducto(nuevoProducto);
  }

  async eliminarProducto(producto: Producto) {
    const key = await this.obtenerKeyProducto(producto);
    this.inventarioService.eliminarProducto(key);
  }
  
  
  private async obtenerKeyProducto(producto: Producto): Promise<string> {
    const index = this.productos.findIndex(p => p === producto);
    const snapshotChanges = await this.productosRef.snapshotChanges().pipe(take(1)).toPromise();
    if (!snapshotChanges) {
      throw new Error('No se encontraron cambios en el snapshot');
    }
    const snapshot = snapshotChanges[index].payload;
    return snapshot.key as string;
  }
  abrirFormularioModificacion(producto: Producto) {
    this.productoSeleccionado = { ...producto }; // Clonar el producto seleccionado
    this.mostrarFormularioModificacion = true;
    
    // Llenar los campos de modificación con los valores actuales del producto
    this.nombreModificado = producto.nombre;
    this.precioModificado = producto.precio.toString();
    this.stockModificado = producto.stock.toString();
  }
  modificarProducto(nombre: string, precio: string, stock: string) {
    if (this.productoSeleccionado) {
      const productoModificado: Producto = {
        nombre: nombre,
        precio: parseFloat(precio),
        stock: parseInt(stock)
      };
  
      this.inventarioService.modificarProducto(this.productoSeleccionado.$key!, productoModificado);
  
      this.mostrarFormularioModificacion = false;
      this.productoSeleccionado = null;
    }
  }
  
  
  guardarModificacion() {
    if (this.productoSeleccionado) {
      const nombre = this.nombreModificado;
      const precio = parseFloat(this.precioModificado);
      const stock = parseInt(this.stockModificado);
  
      const productoModificado: Producto = {
        nombre: nombre,
        precio: precio,
        stock: stock
      };
  
      this.inventarioService.modificarProducto(this.productoSeleccionado.$key!, productoModificado);
  
      this.mostrarFormularioModificacion = false;
      this.productoSeleccionado = null;
    }
  }
  
  
  
}