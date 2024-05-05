const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
///////////////////////////////////////////////////////////////////7
// Obtener los datos del carrito del localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        allProducts = savedCart;
        showHTML();
    }
});


/////FUNCION CARRUSEL 

// Función para guardar los datos del carrito en el localStorage
const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(allProducts));
};

// Escuchar eventos para agregar productos al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        // Resto del código para agregar productos al carrito...

        // Después de agregar el producto, guarda el carrito en el localStorage
        saveCartToLocalStorage();
    }
});

// Escuchar eventos para eliminar productos del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        // Resto del código para eliminar productos del carrito...

        // Después de eliminar el producto, guarda el carrito en el localStorage
        saveCartToLocalStorage();
    }
});

function ComprarCarrito() {
    // Vacía el contador de productos
    countProducts.innerText = "0";

    // Vacía la lista de productos en el carrito
    allProducts = [];

    // Actualiza el HTML para reflejar los cambios
    showHTML();
	// Muestra el mensaje de agradecimiento por la compra
    mostrarMensaje('¡Gracias por su compra!');

}

function mostrarMensaje(mensaje) {
    // Crear elemento de mensaje
    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add('mensaje');
    mensajeElemento.textContent = mensaje;

        // Agregar el mensaje al cuerpo del documento
    document.body.appendChild(mensajeElemento);

    // Eliminar el mensaje después de unos segundos
    setTimeout(() => {
        mensajeElemento.remove();
    }, 3000); // El mensaje se eliminará después de 3 segundos (3000 milisegundos)
}

///////////////////////////////

// FUNCION DE CARRITO ///
// Función para mostrar la diapositiva anterior en el carrusel dentro del elemento 'item'
function prevSlide(itemIndex) {
    var carousel = document.querySelectorAll('.item')[itemIndex].querySelector('.carousel');
    var slides = carousel.querySelectorAll('figure img');
    var currentSlide = carousel.querySelector('.active');
    var prevIndex = Array.from(slides).indexOf(currentSlide) - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1;
    }
    currentSlide.classList.remove('active');
    slides[prevIndex].classList.add('active');
}

// Función para mostrar la siguiente diapositiva en el carrusel dentro del elemento 'item'
function nextSlide(itemIndex) {
    var carousel = document.querySelectorAll('.item')[itemIndex].querySelector('.carousel');
    var slides = carousel.querySelectorAll('figure img');
    var currentSlide = carousel.querySelector('.active');
    var nextIndex = Array.from(slides).indexOf(currentSlide) + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    currentSlide.classList.remove('active');
    slides[nextIndex].classList.add('active');
}