import { obtenerProductos, obtenerProducto } from "./firebase.js";

const cart = []

let total = 0;

const checkout = document.querySelector('.checkout');

const finalizarCompra = () => {

  total = 0;

  document.querySelector('.visualTotal').textContent = total;

  cart.length = 0;

  document.querySelector('.innerCart').innerHTML = '';

  Swal.fire('Compra Finalizada', 'Gracias por tu compra!', 'success')

}

checkout.addEventListener('click', finalizarCompra);

const emptycar = document.querySelector('.emptycar');

const vaciarCarrito = () => {

  total = 0;

  document.querySelector('.visualTotal').textContent = total;

  cart.length = 0;

  document.querySelector('.innerCart').innerHTML = '';

}

emptycar.addEventListener('click', vaciarCarrito);

const renderCart = () => {

  const innerCart = document.querySelector('.innerCart');

  innerCart.innerHTML = '';

  cart.forEach(producto => {

  const card = document.createElement('div');

   card.className = "card mb-3";

   card.innerHTML = `

      <div class="row g-0">

        <div class="col-md-4">

          <img src=${producto.data().img} class="img-fluid rounded-start" alt=${producto.data().nombre}>

        </div>

        <div class="col-md-8">

          <div class="card-body">

            <h5 class="card-title">${producto.data().nombre}</h5>

            <p class="card-text">${producto.data().precio}</p> 

          </div>

        </div>

      </div>  

    `;

    innerCart.append(card);

  });

}

const checkCart = (id) => cart.some(producto => producto.id === id);

const updateTotal = (precio) => {

  const visualTotal = document.querySelector('.visualTotal');

  total += precio;

  visualTotal.textContent = total;

}

const addToCart = async (e) => {

  if (checkCart(e.target.id)) {

    return false;

  }

  else {

    const productToCart = await obtenerProducto(e.target.id);
    
    updateTotal(productToCart.data().precio);

    cart.push(productToCart);
  
    renderCart();

  }

}

const addEvent = () => {

  const buyButtons = document.querySelectorAll('.buyBtn');

   buyButtons.forEach(btn => btn.addEventListener('click', addToCart));

 }

const crearCard = async (productosArr) => {

    const productos = await productosArr;

    const cards = document.querySelector('.cards');

    productos.forEach(producto => {

     const card = document.createElement('div');

     card.className = 'card col-6 col-md-4 col-lg-3 col-xl-2';

      card.innerHTML =  `

        <img src=${producto.data().img} class="card-img-top productImg" alt=${producto.data().nombre}>

          <div class="card-body">

            <h5 class="card-title">${producto.data().nombre}</h5>

            <p class="card-text">${producto.data().precio}</p>

            <button class="btn btn-dark buyBtn" id=${producto.id}>Comprar</button>          

          </div> 

      `;

      cards.append(card);
    
    });

    addEvent();

}

crearCard (obtenerProductos());