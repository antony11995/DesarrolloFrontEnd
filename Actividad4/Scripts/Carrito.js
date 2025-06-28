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
            // Buscar por SKU en mayúsculas y minúsculas
            const producto = this.productos.find(p => (p.sku || p.SKU) === sku);
            if (producto) {
                const quantity = this.carrito[sku];
                // Usar nombre y precio correctos según la estructura
                products.push({
                    sku: sku,
                    quantity: quantity,
                    nombre: producto.nombre || producto.title,
                    precio: producto.precio !== undefined ? producto.precio : parseFloat(producto.price)
                });
                total += (producto.precio !== undefined ? producto.precio : parseFloat(producto.price)) * quantity;
            }
        }
        return {
            total: total.toFixed(2),
            currency: this.currency,
            products: products
        };
    }
}