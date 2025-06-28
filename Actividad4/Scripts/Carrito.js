class Carrito {
    constructor(productos, currency ) {
        this.productos = productos;
        this.carrito = {};
        this.currency = currency;
    }

    actualizarUnidades(sku, unidades) {
        if (unidades > 0) {
            this.carrito[sku] = unidades;
        } else {
            delete this.carrito[sku];
        }
    }

    obtenerInformacionProducto(sku) {
        if (this.carrito[sku]) {
            return { sku: sku, quantity: this.carrito[sku] };
        }
        return null;
    }

    obtenerCarrito() {
        let total = 0;
        let products = [];
        for (const sku in this.carrito) {
            const producto = this.productos.find(p => p.sku === sku);
            if (producto) {
                const quantity = this.carrito[sku];
                total += producto.precio * quantity;
                products.push({
                    sku: sku,
                    quantity: quantity,
                    nombre: producto.nombre,
                    precio: producto.precio
                });
            }
        }
        return {
            total: total.toFixed(2),
            currency: this.currency,
            products: products
        };
    }
}