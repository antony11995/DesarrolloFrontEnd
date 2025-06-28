//asegurarse que el  DOM esta cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón de añadir al carrito
    const addToCartButton = document.getElementById("add-to-cart-button");
    
    // Añade un evento click al botón
    addToCartButton.addEventListener("click", function() {
        // Lógica para añadir el producto al carrito
        console.log("Producto añadido al carrito");
        
        // Aquí podrías llamar a una función que maneje la lógica del carrito
        // Por ejemplo, Carrito.agregarProducto(producto);
    });
    
    // Puedes añadir más eventos o lógica aquí según sea necesario
});

