document.addEventListener("DOMContentLoaded", function() {
    fetch("http://jsonblob.com/api/1388336459743944704")
        .then(response => response.json())
        .then(data => {
            let productos = Array.isArray(data.products) ? data.products : [];
            let currency = data.currency || '€';
            console.log('Productos recibidos de la API:', productos);
            const carrito = new Carrito(productos, currency);
            pintarProductosTabla(productos, carrito, currency);
        })
        .catch(error => {
            console.error("Error al obtener los productos:", error);
        });
});

function pintarProductosTabla(productos, carrito, currency) {
    const tbody = document.getElementById('productos-tbody');
    tbody.innerHTML = '';
    const template = document.getElementById('producto-template');
    productos.forEach(producto => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.nombre-producto').textContent = producto.title;
        clone.querySelector('.sku-producto').textContent = `Ref: ${producto.SKU}`;
        clone.querySelector('.btn-menos').setAttribute('data-sku', producto.SKU);
        clone.querySelector('.btn-mas').setAttribute('data-sku', producto.SKU);
        clone.querySelector('.input-cantidad').setAttribute('data-sku', producto.SKU);
        clone.querySelector('.input-cantidad').value = 0;
        clone.querySelector('.precio-producto').textContent = parseFloat(producto.price).toFixed(2) + currency;
        clone.querySelector('.total-producto').setAttribute('data-sku', producto.SKU);
        clone.querySelector('.total-producto').textContent = '0' + currency;
        tbody.appendChild(clone);
    });
    addEventListeners(carrito, productos, currency);
}

function addEventListeners(carrito, productos, currency) {
    document.querySelectorAll('.btn-menos').forEach(btn => {
        btn.addEventListener('click', function() {
            const sku = this.getAttribute('data-sku');
            const input = document.querySelector(`.input-cantidad[data-sku='${sku}']`);
            let cantidad = parseInt(input.value);
            if (cantidad > 0) {
                cantidad--;
                input.value = cantidad;
                carrito.actualizarUnidades(sku, cantidad);
                updateTotals(carrito, productos, currency);
            }
        });
    });
    document.querySelectorAll('.btn-mas').forEach(btn => {
        btn.addEventListener('click', function() {
            const sku = this.getAttribute('data-sku');
            const input = document.querySelector(`.input-cantidad[data-sku='${sku}']`);
            let cantidad = parseInt(input.value);
            cantidad++;
            input.value = cantidad;
            carrito.actualizarUnidades(sku, cantidad);
            updateTotals(carrito, productos, currency);
        });
    });
}

function updateTotals(carrito, productos, currency) {
    productos.forEach(producto => {
        const cantidad = carrito.obtenerInformacionProducto(producto.SKU)?.quantity || 0;
        const total = cantidad * parseFloat(producto.price);
        document.querySelector(`.total-producto[data-sku='${producto.SKU}']`).textContent = total.toFixed(2) + currency;
    });
    const carritoInfo = carrito.obtenerCarrito();
    document.getElementById('total-carrito').textContent = (carritoInfo.total || 0) + currency;
}

