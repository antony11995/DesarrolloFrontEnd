// Clase que gestiona el carrito de compras
class Carrito {
    // Constructor: recibe la lista de productos y la moneda
    constructor(productos, currency ) {
        this.productos = productos; // Array de productos disponibles
        this.carrito = {}; // Objeto con los productos agregados al carrito (sku: cantidad)
        this.currency = currency; // Moneda
    }

    // Actualiza la cantidad de un producto en el carrito
    actualizarUnidades(sku, unidades) {
        if (unidades > 0) {
            this.carrito[sku] = unidades; // Si hay unidades, actualiza
        } else {
            delete this.carrito[sku]; // Si es 0, elimina del carrito
        }
    }

    // Devuelve información de un producto en el carrito
    obtenerInformacionProducto(sku) {
        if (this.carrito[sku]) {
            return { sku: sku, quantity: this.carrito[sku] };
        }
        return null;
    }

    // Devuelve el resumen del carrito: productos, total y moneda
    obtenerCarrito() {
        let total = 0;
        let products = [];
        for (const sku in this.carrito) {
            // Busca el producto por SKU (mayúsculas o minúsculas)
            const producto = this.productos.find(p => (p.sku || p.SKU) === sku);
            if (producto) {
                const quantity = this.carrito[sku];
                // Agrega al resumen el nombre y precio correcto
                products.push({
                    sku: sku,
                    quantity: quantity,
                    nombre: producto.title, 
                    precio: producto.precio !== undefined ? producto.precio : parseFloat(producto.price)
                });
                // Suma al total
                total += (producto.precio !== undefined ? producto.precio : parseFloat(producto.price)) * quantity;
            }
        }
        return {
            total: total.toFixed(2), // Total formateado a 2 decimales
            currency: this.currency,
            products: products
        };
    }
}