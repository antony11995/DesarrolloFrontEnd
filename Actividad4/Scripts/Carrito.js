class Carrito {
    constructor(productos) {
    }

    actualizarUnidades(sku, unidades) {
      // Actualiza el número de unidades que se quieren comprar de un producto
    }

    obtenerInformacionProducto(sku) {
      // Devuelve los datos de un producto además de las unidades seleccionadas
      // Por ejemplo
      // {
      //   "sku": "0K3QOSOV4V",
      //   "quantity": 3
      // } 
    }

    obtenerCarrito() {
      // Devuelve información de los productos añadidos al carrito
      // Además del total calculado de todos los productos
      // Por ejemplo:
      // {
      //   "total": "5820",
      //   "currency: "€",
      //   "products" : [
      //     {
      //       "sku": "0K3QOSOV4V"
      //       ..
      //     }
      //    ]}
      // }
    }

    /* constructor() {
        this.items = [];
    }

    agregarProducto(producto) {
        this.items.push(producto);
    }

    eliminarProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
    }

    calcularTotal() {
        return this.items.reduce((total, item) => total + item.precio, 0);
    }

    mostrarCarrito() {
        console.log("Carrito de Compras:");
        this.items.forEach(item => {
            console.log(`Producto: ${item.nombre}, Precio: $${item.precio}`);
        });
        console.log(`Total: $${this.calcularTotal()}`);
    } */
}