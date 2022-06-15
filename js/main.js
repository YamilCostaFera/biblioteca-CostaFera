const botonCarrito = document.querySelectorAll('.botonCarrito');
const itinerarCarrito = document.querySelector('.itinerarCarrito');
const tbody = document.querySelector('.tbody');
// const botonFinalizar = document.querySelector('.finalizarCompra');
let compra = [];

botonCarrito.forEach(btn => {
    btn.addEventListener('click', sumarProducto);
    btn.addEventListener('click', ()=>{
        Toastify({

            text: `Agregaste al carrito`,

            duration: 3000,

            offset: {x:10, y:100}
            
            }).showToast();
    } 
    );
   
})

//boton finalizar compra ||FALTA TERMINARLO
// botonFinalizar (btn =>{
//     btn.addEventListener('click',()=>{

//     })
// })
function sumarProducto(e) {
    // Con esto tomamos los elementos de los productos
    const button = e.target;
    const seleccion = button.closest('.card');
    const seleccionTorta = seleccion.querySelector('.card-title').textContent;
    const seleccionPrecio = seleccion.querySelector('.precio').textContent;
    const seleccionImg = seleccion.querySelector('.card-img-top').src;

    // con esta variable se crea un item nuevo tomando la funcion anterior
    const newItem = {
        title: seleccionTorta,
        precio: seleccionPrecio,
        img: seleccionImg,
        cantidad: 1,
    }
    addItemCompra(newItem);
}
// con esta funcion agragamos el nuevo item al carrito ||push
function addItemCompra(newItem) {

    const inputCantidad = tbody.getElementsByClassName('sumarCantidad');
    //para recorrer el carrito y que sume los productos iguales || .trim sirve para eliminar espacios a los lados, para garantzar que esten iguales
    for (let i = 0; i < compra.length; i++) {
        if (compra[i].title.trim() === newItem.title.trim()) {
            compra[i].cantidad++; //cuando la condicion se cumpla, el valor cantidad aumenta
            const inputSumar = inputCantidad[i];
            inputSumar.value++; //sumamos una unidad de valor a la cantidad 
            CarritoTotal(); //ejecutamos la funcion para ir sumando los productos/items
            console.log(compra); //visualizamos en la consola la compra
            return null; //use el null para que no ejecute lo que sigue de la funcion, sino que retorne directamente arriba
        }


    }

    compra.push(newItem);
    renderCArrito();

}

//funcion para renderizar, incorporar los productos al carrito y que se visibilice en el html
function renderCArrito() {
    tbody.innerHTML = '';
    console.log(compra);
    compra.map(item => {
        const tr = document.createElement('tr');
        tr.classList.add('itemCarrito'); //se agrega una clase para ser creada con el tr
        const Content = `
        <th scope="row">1</th>
             <td class="fila_productos">
                 <img src=${item.img} alt="">
                 <h5 class="name ps-4 mt-2">${item.title} </h5>
             </td>
             <td class="fila_precio">
                 <p>${item.precio}</p>
             </td>
             <td class="fila_cantidad">
                 <input class="sumarCantidad" type="number" min="1" value=${item.cantidad}>
                 <button class="delete btn btn-warning">X</button>
             </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr);

        tr.querySelector('.delete').addEventListener('click', removerItemCArrito);

    })
    CarritoTotal(); //ejecutamos la funcion para ir sumando los productos/items cada vez que renderice en el HTML los valores
    BtnDelete;
}


//para sumar los precios
function CarritoTotal() {
    let total = 0;
    const itemCompraTotal = document.querySelector('.totalCarrito');
    compra.forEach(item => {
        const precio = Number(item.precio.replace("$", ''));
        total = total + precio * item.cantidad; // calculo del precio por la cantidad.
    })
    //con este innerHTML imprimimos el nuevo total.
    itemCompraTotal.innerHTML = `Total de tu compra: $ ${total}`;
    addLocalStorage();
}


//funcion para remover productos del carrito
function removerItemCArrito(e) {
    const buttonDelete = e.target;
    const tr = buttonDelete.closest('.itemCarrito'); //componente PADRE del boton
    const title = tr.querySelector('.name').textContent;

    for (let i = 0; i < compra.length; i++) {
        if (compra[i].title.trim() === title.trim()) {
            compra.splice(i, 1); // le damos la posicion donde nos encontramos [i] al elemento a eliminar y la cantidad (1).
        }
    }
    tr.remove();
    CarritoTotal(); //se vuelve a ejecutar para que modifique el total de la suma
}




//LOCALSTORAGE || para refrescar la pagina y que no se borre el carrito

function addLocalStorage() {
    localStorage.setItem('compra', JSON.stringify(compra));
}



window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('compra'));
    if (storage) {
        compra = storage;
        renderCArrito();
    }
}

