let carrito = [];
let seccionActual = '';
let temaActual = 'Claro';

class Categoria {
    constructor(id, nombre, subCategorias){
        this.id = id;
        this.nombre = nombre;
        this.subCategorias = subCategorias;
    }
};

class Subcategoria {
    constructor(id, idCategoria, nombre, productos){
        this.id = id;
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.productos = productos;
    }
};

class Producto {
    constructor(id, idSubCategoria, descripcion, stock, precio){
        this.id = id;
        this.idSubCategoria = idSubCategoria;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
    }
};




const categorias = [
    new Categoria (100, "Hombre", []),
    new Categoria (101, "Mujer", []),
];

let subCategorias = [
    //subcategorias de ropa de hombre
    new Subcategoria (100, 100, "Remeras", []),
    new Subcategoria (101, 100, "Jeans", []),
    new Subcategoria (102, 100, "Joggers", []),
    new Subcategoria (103, 100, "Bermudas", []),

    //subcategorias de ropa de mujer
    new Subcategoria (104, 101, "Camisas y tops", []),
    new Subcategoria (105, 101, "Pantalones", []),
    new Subcategoria (106, 101, "Sweaters y buzos", []),

];

let productos = [
    // ropa de hombre
    new Producto('_100', 103, 'BERMUDA DE GABARDINA "MATTHEW"', 5, 24200),
    new Producto('_101', 103, 'BERMUDA DE GABARDINA "LEMON"', 3, 25300),
    new Producto('_102', 100, 'REMERA MAO "FAKE"', 2, 15700),
    new Producto('_103', 103, 'BERMUDA DE TUSSOR "TULUM"', 11, 22100),
    new Producto('_104', 101, 'PANTALÓN DE JEAN SKINNY "FULL"', 3, 32200),
    new Producto('_105', 101, 'PANTALÓN DE JEAN SKINNY "BLACKY"', 9, 28980),
    new Producto('_106', 100, 'REMERA BÁSICA "PALAU"', 11, 13600),
    new Producto('_107', 100, 'REMERA "OWN"', 7, 12900),
    new Producto('_108', 100, 'REMERA "OCEAN"', 4, 15000),
    new Producto('_109', 102, 'PANTALÓN JOGGER CARGO "NIZA"', 6, 34500),
    new Producto('_110', 102, 'PANTALÓN JOGGER DE JEAN "BRIGHT"', 5, 36800),
    new Producto('_111', 100, 'MUSCULOSA "SAND"', 7, 11100),
    new Producto('_112', 100, 'MUSCULOSA "CHAIR"', 10, 11000),
    new Producto('_113', 100, 'MUSCULOSA "NBA"', 4, 9900),

    //ropa de mujer
    new Producto('_114', 104, 'TOP AMBER LAOS', 6, 55800),
    new Producto('_115', 104, 'CAMISA SPOT', 3, 50700),
    new Producto('_116', 104, 'TOP LUIGIANA I', 10, 47990),
    new Producto('_117', 104, 'TOP MOSS BASIC', 3, 27490),
    new Producto('_118', 104, 'CAMISA HALEY RIBBON', 9, 65000),
    new Producto('_119', 105, 'PANTALON THELMA', 4, 85500),
    new Producto('_120', 105, 'PANTALON ELENA CARGO', 12, 48300),
    new Producto('_121', 105, 'PANTALON CLEO ARMY', 9, 76450),
    new Producto('_122', 105, 'PANTALON ALLY SUMMER', 6, 55900),
    new Producto('_123', 106, 'SWEATER ROSS SUMMER LI', 7, 37300),
    new Producto('_124', 106, 'CARDIGAN PHILLIPHE LI', 2, 63600),
    new Producto('_125', 106, 'TRACKER BARIS SALIM', 5, 55400),
    new Producto('_126', 106, 'SWEATER LINDA SHINE', 8, 73000),

];

function agregarSubcategoriaACategoria(subcategoria, categoria) {
    if (subcategoria.idCategoria === categoria.id) {
        categoria.subCategorias.push(subcategoria);
    };
};

categorias.forEach(categoria => {
    subCategorias.forEach(subcategoria => {
        agregarSubcategoriaACategoria(subcategoria, categoria);
    });
});





const obtenerContenedorPrincipal = () => {
    return document.getElementById("contenedorPrincipal");
};

const vaciarContenedorPrincipal = () => {
    const contenedorPrincipal = obtenerContenedorPrincipal();
    contenedorPrincipal.innerHTML = "";
};

const agregarElementoAlContenedorPrincipal = elemento => {
    const contenedorPrincipal = obtenerContenedorPrincipal();
    contenedorPrincipal.appendChild(elemento);
};


const obtenerPrecioTotalDelCarrito =()=> {
    return carrito.reduce ((total, item) => {
        const producto = buscarProductoPorId(item.id);
        return total + (producto.precio * item.cantidad);
    }, 0);
};



function buscarProductoPorId(id) {
    const producto = productos.find( productoBuscado => productoBuscado.id === id);
    return producto;
};



function ocultarOpcionesDeOrdenDeProductos() {
    contItemsFiltros = document.getElementById("contItemsFiltros");

    contItemsFiltros.style.visibility = "hidden";
    contItemsFiltros.style.pointerEvents = "none";
};

function mostrarOpcionesDeOrdenDeProductos() {
    contItemsFiltros = document.getElementById("contItemsFiltros");

    contItemsFiltros.style.visibility = "visible";
    contItemsFiltros.style.pointerEvents = "auto";
};













// ----------- Funciones para guardar y recuperar el carrito localmente ----------


function recuperarCarritoDeCompras() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    };
};

function guardarCarritoLocalmente() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};









// ----------- Funciones para guardar y recuperar los productos localmente --------

function agregarProductoASubcategoria(producto, subcategoria) {
    if (producto.idSubCategoria === subcategoria.id) {
        subcategoria.productos.push(producto);
    };
};

function cargarProductosASubcategorias() {
    subCategorias.forEach(subcategoria => {
        productos.forEach(producto => {
            agregarProductoASubcategoria(producto, subcategoria);
        });
    });
}





function recuperarProductos() {
    const productosRecuperados = localStorage.getItem('productos');
    if (productosRecuperados) {
        productos = JSON.parse(productosRecuperados);
        cargarProductosASubcategorias();
    } else {
        cargarProductosASubcategorias();
    };

};

function guardarProductosLocalmente() {
    localStorage.setItem('productos', JSON.stringify(productos));
};












// -------------- Funciones para manejar el cambio de tema ---------- //



const establecerColorDeTextoDeElementoSegunTemaActivo = elemento => {
    if (temaActual === "Oscuro") {
        elemento.classList.toggle("textoTemaOscuro");
    };
};

const establecerColorDeBordeDeElementoSegunTemaActivo = elemento => {
    if (temaActual === "Oscuro") {
        elemento.classList.toggle("bordeTemaOscuro");
    };
};

const cambiarTemaActual =()=> {
    if (temaActual === "Claro") {
        temaActual = "Oscuro";
    } else {
        temaActual = "Claro";
    };
};

const establecerComportamientoBotonTema = function () {
    const botonTema = document.getElementById("botonTema");
    botonTema.addEventListener("click", () => {
        
        cambiarTemaActual();
        document.body.classList.toggle("temaOscuro");

        const todosLosElementos = document.querySelectorAll('*');
        todosLosElementos.forEach(elemento => {
            elemento.classList.toggle("bordeTemaOscuro");
        });
    });
}













// ------------ Funciones para generar finalizacion de la compra -------


function crearSeccionCompraFinalizada() {
    vaciarContenedorPrincipal();
    vaciarCarrito();

    const contenedorCompraFinalizada = document.createElement("div");
    contenedorCompraFinalizada.id = "contenedorCompraFinalizada";
    contenedorCompraFinalizada.innerHTML ='<h1>¡Gracias por su compra!</h2>';

    const botonVolver = document.createElement("button");
    botonVolver.id = "botonVolver";
    botonVolver.innerText = "Volver";
    botonVolver.addEventListener("click", ()=> {
        renderizarTodosLosProductos();
    });

    contenedorCompraFinalizada.appendChild(botonVolver);
    
    agregarElementoAlContenedorPrincipal(contenedorCompraFinalizada);    
};







// ------------ Funciones para generar la seccion de pago -------------------------



function actualizarTextoCantidadItemsCarrito() {
    /*  Se actualiza el texto de cantidad de items que se
    encuentra al lado del boton del carrito. */
    const textoCantItemsEnCarrito = document.getElementById('textoCantItemsEnCarrito');
    textoCantItemsEnCarrito.innerText = `(${carrito.reduce((total, producto) => total + producto.cantidad, 0)})`;
};

const vaciarCarrito =()=> carrito.length = 0;

const actualizarCarritoDeCompras =()=> {
    vaciarCarrito();
    guardarCarritoLocalmente();
};


const crearBotonConfirmacionPago =()=>{
    const botonConfirmacionDePago = document.createElement("button");
    botonConfirmacionDePago.id = "botonConfirmarPago";
    botonConfirmacionDePago.className = "botonesConfirmacionPago";
    botonConfirmacionDePago.innerText = "Confirmar";
    botonConfirmacionDePago.addEventListener("click", ()=> {
        actualizarCarritoDeCompras();
        actualizarTextoCantidadItemsCarrito();
        crearSeccionCompraFinalizada();
    });
    return botonConfirmacionDePago;
};

const crearBotonCancelacionDePago =()=> {
    const botonCancelacionDePago = document.createElement("button");
    botonCancelacionDePago.id = "botonCancelarPago";
    botonCancelacionDePago.className = "botonesConfirmacionPago";
    botonCancelacionDePago.innerText = "Cancelar";
    botonCancelacionDePago.addEventListener("click", ()=> {
        renderizarTodosLosProductos();
    });
    return botonCancelacionDePago;
}

const crearBotonesConfirmacion =()=> {
    const contenedorBotonesConfirmacion = document.createElement("div");
    contenedorBotonesConfirmacion.id = "contenedorBotonesConfirmacion";
    
    contenedorBotonesConfirmacion.appendChild(crearBotonConfirmacionPago());
    contenedorBotonesConfirmacion.appendChild(crearBotonCancelacionDePago());

    agregarElementoAlContenedorPrincipal(contenedorBotonesConfirmacion);
};


const crearTituloConfirmacionPago = () => {
    const seccion = document.createElement("div");
    seccion.className = "contenedorTitulo"
    seccion.innerHTML = `<h2>Pago</h2><p>`;

    agregarElementoAlContenedorPrincipal(seccion);
};

const crearConfirmacionDePago=(nroTarjeta)=>{
    const confirmacionDePago = document.createElement("div");
    confirmacionDePago.id ="contenedorConfirmacionPago";
    confirmacionDePago.innerHTML = `
        <h1 id="preguntaConfirmacion">¿Confirma el pago?</h1>
        <h3 id="precioConfirmacion">Abona $ ${obtenerPrecioTotalDelCarrito().toLocaleString()}</h3>
        <h3 id="nroTarjetaConfirmacion">Con la tarjeta número ${nroTarjeta}</h3>
    `;
    establecerColorDeBordeDeElementoSegunTemaActivo(confirmacionDePago);
    agregarElementoAlContenedorPrincipal(confirmacionDePago);
};

function crearSeccionConfirmacionDePago(nroTarjeta) {
    vaciarContenedorPrincipal();

    crearTituloConfirmacionPago();
    crearConfirmacionDePago(nroTarjeta);
    crearBotonesConfirmacion();
};






// ------------ Funciones para generar la seccion de pago -------------------------

const obtenerDatos =()=> {
    const inputNombre = document.getElementById("nombre");
    const inputNroTarjeta = document.getElementById("nroTarjeta");
    const inputMesDeVencimiento = document.getElementById("mesDeVencimiento");
    const inputAnioDeVencimiento = document.getElementById("anioDeVencimiento");
    const inputCodigoSeguridad = document.getElementById("codigoSeguridad");

    const datos = [
        inputNombre.value,
        inputNroTarjeta.value,
        inputMesDeVencimiento.value,
        inputAnioDeVencimiento.value,
        inputCodigoSeguridad.value,
    ]

    return datos;
}


// --------- Validaciones


const generarErrorDeValidacion =(input, span, textoDeError)=> {
    input.classList.add('error');
    span.innerText = textoDeError;
    setTimeout(function() {
        span.innerText = "";
        input.classList.remove('error');
    }, 3000);
}

const validarCodigoSeguridad =(valor)=> {
    datos = obtenerDatos()
    valor = datos[4];

    if (valor.length !== 3) {
        const span = document.getElementById("errorCodigoSeguridad");
        const inputNombre = document.getElementById("codigoSeguridad");
        generarErrorDeValidacion(inputNombre,span, "Ingrese un código válido.");
    } else {
        crearSeccionConfirmacionDePago(datos[1]);
    };
};

const validarAnio =(valor)=> {
    valor = obtenerDatos()[3];

    if (valor < 1920 || valor > 2006) {
        const span = document.getElementById("errorMensajeAnio");
        const inputNombre = document.getElementById("anioDeVencimiento");
        generarErrorDeValidacion(inputNombre,span, "Ingrese un año válido. (1920 - 2006)");
    } else {
        validarCodigoSeguridad();
    }
};

const validarMes =(valor)=> {
    valor = obtenerDatos()[2];

    if (valor < 1 || valor > 12) {
        const span = document.getElementById("errorMensajeMes");
        const inputNombre = document.getElementById("mesDeVencimiento");
        generarErrorDeValidacion(inputNombre, span, "Ingrese un mes válido.");
    } else {
        validarAnio();
    }
};

const validarTarjeta =(valor)=> {
    valor = obtenerDatos()[1];

    if (valor.length !== 16) {
        const span = document.getElementById("errorNroTarjeta");
        const inputNombre = document.getElementById("nroTarjeta");
        generarErrorDeValidacion(inputNombre, span, "Ingrese un número valido.");
    } else {
        validarMes();
    }
};

const validarNombre =()=> {
    valor = obtenerDatos()[0];

    if (valor==="") { 
        const span = document.getElementById("errorMensajeNombre");
        const inputNombre = document.getElementById("nombre");
        generarErrorDeValidacion(inputNombre, span, "Ingrese el nombre que figura en la tarjeta.");
    } else {
        validarTarjeta();
    }
};



const crearBotonContinuar = () => {
    const botonContinuar = document.createElement("button");
    botonContinuar.id = "bontonContinuar";
    botonContinuar.type = "submit";
    botonContinuar.innerText = "Continuar";
    botonContinuar.addEventListener("click", (event)=> {
        event.preventDefault();

        validarNombre();
    });

    const contenedorForm = document.getElementById("contenedorForm");
    contenedorForm.appendChild(botonContinuar);
};


const crearFormDeDatosDelPago = () => {
    const contenedorForm = document.createElement("form");
    contenedorForm.id = "contenedorForm"
    contenedorForm.innerHTML = `
    <div id="ejemploTarjetas">
        <div id="ejemploTarjetasCredito">

        </div>
        <div id="ejemploTarjetasDebito">

        </div>
    </div>

    <div id="contenedorDatos">
        <div id="datosIzquierda">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" placeholder="Como aparece en la tarjeta">
            <span id="errorMensajeNombre" class="mensajeDeError"></span>

            <div id="datosFechaVencimiento">
                <label for="mesDeVencimiento">Fecha de vencimiento</label>
                <div id="inputsVencimiento">

                    <div id="contInputMesVencimiento">
                        <input type="text" id="mesDeVencimiento" name="mesDeVencimiento" placeholder="Mes">
                        <span id="errorMensajeMes" class="mensajeDeError"></span>
                    </div>

                    <div id="contInputAnioVencimiento">
                        <input type="text" id="anioDeVencimiento" name="anioDeVencimiento" placeholder="Año">
                        <span id="errorMensajeAnio" class="mensajeDeError"></span>
                    </div>
                </div>
            </div> 
        </div>


        <div id="datosDerecha">
            <label for="nroTarjeta">Número de la tarjeta</label>
            <input type="text" id="nroTarjeta" name="nroTarjeta" placeholder="16 dígitos">
            <span id="errorNroTarjeta" class="mensajeDeError"></span>

            <div id="datosCodigoSeguridad">
                <label for="codigoSeguridad">Código de seguridad</label>
                <div id="inputCodigoSeguridad">
                    <input type="text" id="codigoSeguridad" name="codigoSeguridad" placeholder="3 dígitos">
                    <span id="errorCodigoSeguridad" class="mensajeDeError"></span>
                </div>
            </div>
        </div>
    </div>
    `;

    establecerColorDeBordeDeElementoSegunTemaActivo(contenedorForm);
    agregarElementoAlContenedorPrincipal(contenedorForm);
};

const crearTituloSeccionPago = () => {
    const seccion = document.createElement("div");
    seccion.className = "contenedorTitulo"
    seccion.innerHTML = `<h2>Pago</h2><p>`;

    establecerColorDeBordeDeElementoSegunTemaActivo(seccion);
    agregarElementoAlContenedorPrincipal(seccion);
};


function renderizarSeccionPago() {
/*     const ContenedorPrincipal = obtenerContenedorPrincipal();
    ContenedorPrincipal.style.display ="flex"
    ContenedorPrincipal.style.flexDirection = "column" */

    vaciarContenedorPrincipal();
    crearTituloSeccionPago();
    crearFormDeDatosDelPago();
    crearBotonContinuar();
};









// ------------ Funciones para agregar productos al carrito --------------------

function descontarStockDelProducto(producto) {
    producto.stock -= 1;
};

function actualizarStockDelProductoEnElDOM(producto) {
    /* Se actualiza el texto de cantidad de stock restante del
    producto que se acaba de agregar al carrito de compras. */
    const TextoDeStockAtualDelProducto = document.querySelector(`#${producto.id} .stockProducto`);
    TextoDeStockAtualDelProducto.innerText = `Stock: ${producto.stock}`;
};



function agregarProductoACarrito(producto) {
    /*  Se obtiene el indice el producto seleccionado,
    en el array del carrito de compras. */
    const indiceDelProducto = carrito.findIndex (item => item.id === producto.id);

    if (indiceDelProducto !== -1) {
    /* Si se encuentra el producto en el carrito, se aumenta su cantidad. */
        carrito[indiceDelProducto].cantidad += 1; 
    } else {
    /* Se no se encuentra el producto en el carrito, se agrega. */
        carrito.push({id: producto.id, cantidad: 1});
    }

    descontarStockDelProducto(producto);
    actualizarStockDelProductoEnElDOM(producto);
    guardarCarritoLocalmente();
    guardarProductosLocalmente();
    actualizarTextoCantidadItemsCarrito();

};

function comprobarSiHayStockParaAgregarAlCarrito(producto) {
    if (producto.stock > 0) {
        agregarProductoACarrito(producto);
    };
};







// ------------ Funciones para descartar productos del carrito ------------------


const devolverStockAProducto = function(producto, cantidad) {
    producto.stock += cantidad;
};

const quitarProductoDelCarrito = function(producto){
    const indiceDelProductoADescartar = carrito.findIndex(item => item.id === producto.id);

    if (indiceDelProductoADescartar !== -1) {
        devolverStockAProducto(producto, carrito[indiceDelProductoADescartar].cantidad);
        carrito.splice(indiceDelProductoADescartar, 1);
      }
};

const descartarProductoDelCarrito = function(producto){
    quitarProductoDelCarrito(producto);
    actualizarTextoCantidadItemsCarrito();
    guardarCarritoLocalmente();
    renderizarCarritoDeCompras();
};








// ------------ Funciones para generar el carrito -----------------------------------




function renderizarProductoEnCarrito(productoEnCarrito, contenedor) {
    const producto = buscarProductoPorId(productoEnCarrito.id);
    const indiceDelProductoEnElCarrito = carrito.findIndex (item => item.id === producto.id);

    const contenedorProductoEnCarrito = document.createElement("div");
    contenedorProductoEnCarrito.className = "contenedorProductoEnCarrito";
    contenedorProductoEnCarrito.innerHTML = `
        <div class="contImagen">
            <img src="./assets/imgs_productos/${producto.id}.png">
        </div>
        <div class="contDescripcion">
            <p>${producto.descripcion}</p>
        </div>
        <div id="contenedorPrecio${producto.id}" class="contPrecio">
            <h3 class="valorProductoCarrito">$ ${producto.precio.toLocaleString()}</h3>
            <p class="cantidadProductoCarrito">Cantidad: ${carrito[indiceDelProductoEnElCarrito].cantidad}</p>
            <p class"subtotalProductoCarrito>Subtotal: $ ${(producto.precio*carrito[indiceDelProductoEnElCarrito].cantidad).toLocaleString()}</p>
        </div>`;

    establecerColorDeBordeDeElementoSegunTemaActivo(contenedorProductoEnCarrito);

    contenedor.appendChild(contenedorProductoEnCarrito);

    const botonDescartarProducto = document.createElement("button");
    botonDescartarProducto.className = "botonesDescartarProducto";
    botonDescartarProducto.innerText = "Descartar";
    botonDescartarProducto.addEventListener("click", ()=> {
        descartarProductoDelCarrito(producto);
    });

    const contPrecioProducto = document.getElementById(`contenedorPrecio${producto.id}`);
    contPrecioProducto.appendChild(botonDescartarProducto);
};




function mostrarProductosEnCarrito() {
    const contenedorPrincipal = obtenerContenedorPrincipal();

    carrito.forEach(producto => {
            renderizarProductoEnCarrito(producto, contenedorPrincipal);
    });
};




function mostrarPrecioTotalEnCarrito() {
    const contenedorPrecioTotalCarrito = document.createElement("div");
    contenedorPrecioTotalCarrito.id = "contenedorPrecioTotalCarrito";

    const precioTotal = obtenerPrecioTotalDelCarrito();
  
    contenedorPrecioTotalCarrito.innerHTML = `<h2>Total: $ ${precioTotal.toLocaleString()}</h2>`;

    agregarElementoAlContenedorPrincipal(contenedorPrecioTotalCarrito);
};




function crearBotonPagarEnCarrito() {
    const botonPagarCarrito = document.createElement("button");
    botonPagarCarrito.id="botonPagarCarrito";
    botonPagarCarrito.innerText= "Pagar";
    botonPagarCarrito.addEventListener("click", () => {
        renderizarSeccionPago();
    });

    const contenedorPrecioTotalCarrito = document.getElementById("contenedorPrecioTotalCarrito");
    contenedorPrecioTotalCarrito.appendChild(botonPagarCarrito);
};





function mostrarAvisoDeCarritoVacio() {
    const avisoDeCarritoVacio = document.createElement("div");
    avisoDeCarritoVacio.id = "contTextoAvisoCarritoVacio";
    avisoDeCarritoVacio.innerHTML = '<h2>No hay productos en el carrito</h2>';

    agregarElementoAlContenedorPrincipal(avisoDeCarritoVacio);
};




function comprobarSiHayProductosEnElCarrito() {
    if (carrito.length > 0) {
        mostrarProductosEnCarrito();
        mostrarPrecioTotalEnCarrito();
        crearBotonPagarEnCarrito();
    } else {
        mostrarAvisoDeCarritoVacio();
    };
};



function renderizarCarritoDeCompras() {
    vaciarContenedorPrincipal();
    ocultarOpcionesDeOrdenDeProductos();

    contenedorPrincipal.style.display ="flex"
    contenedorPrincipal.style.flexDirection = "column"

    const TituloSeccion = document.createElement("div");
    TituloSeccion.className = "contenedorTitulo"
    TituloSeccion.innerHTML = `<h2>Carrito</h2><p>`;

    establecerColorDeBordeDeElementoSegunTemaActivo(TituloSeccion);
    agregarElementoAlContenedorPrincipal(TituloSeccion);

    comprobarSiHayProductosEnElCarrito();
};




// -------------- Funciones para generar el contenido de las categorias ---------


// Funciones para ordenar los productos
const obtenerIDEnNumero = producto => parseInt(producto.id.slice(1));

function ordenarPorID(array) {
    array.sort((item1, item2) => obtenerIDEnNumero(item1) - obtenerIDEnNumero(item2));
};

function ordenarPorMasNuevos(array) {
    array.sort((item1, item2) => obtenerIDEnNumero(item2) - obtenerIDEnNumero(item1));
};

function ordenarPorMenorPrecio(array) {
    array.sort((item1, item2) => item1.precio - item2.precio);
};

function ordenarPorMayorPrecio(array) {
    array.sort((item1, item2) => item2.precio - item1.precio);
};

function ordenarProductos(array) {
    const objetoOrden = document.getElementById('orden');
    const opcionSeleccionada = objetoOrden.value;

    switch (opcionSeleccionada) {
        case "Id":
            ordenarPorID(array);
            break;
        case "Más nuevos":
            ordenarPorMasNuevos(array);
            break;
        case "Menor precio":
            ordenarPorMenorPrecio(array);
            break;
        case "Mayor precio":
            ordenarPorMayorPrecio(array);
            break;
    };
};






/* Funcion para crear y agregar el titulo de la seccion. */
function crearTituloDeSeccion(seccionSeleccionada, contenedor) {

    const seccion = document.createElement("div");
    seccion.className = "contenedorTitulo"
    seccion.innerHTML = `<h2>${seccionSeleccionada.nombre}</h2>`;

    establecerColorDeBordeDeElementoSegunTemaActivo(seccion);
    contenedor.appendChild(seccion);
};



// funcion para crear y agregar el boton de agregar el carrito en un producto
function renderizarBotonAgregarAlCarrito(producto) {
    const botonAgregarAlCarrito = document.createElement("button");
    botonAgregarAlCarrito.className = "botonAgregarAlCarrito";
    botonAgregarAlCarrito.innerText = "Agregar al carrito";

    botonAgregarAlCarrito.addEventListener("click", () =>{
        comprobarSiHayStockParaAgregarAlCarrito(producto);
    });

    productoAInsertarBoton = document.getElementById(`${producto.id}`);
    productoAInsertarBoton.appendChild(botonAgregarAlCarrito);
};





// funcion para crear y agregar la imagen, precio y descpripcion
function renderizarProducto(producto, contenedor) {


    const productoAAgregar = document.createElement("div");
    productoAAgregar.className = "contenedorProducto";
    productoAAgregar.id = `${producto.id}`;
    productoAAgregar.innerHTML =`
        <img src="./assets/imgs_productos/${producto.id}.png">
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p class="precioProducto">$ ${producto.precio.toLocaleString()}</p>
        <p class="stockProducto">Stock: ${producto.stock}</p>
    `;

    establecerColorDeBordeDeElementoSegunTemaActivo(productoAAgregar);

    contenedor.appendChild(productoAAgregar);
    renderizarBotonAgregarAlCarrito(producto);
};







function renderizarSubcategoria(subCategoriaSeleccionada) {
    seccionActual=`${subCategoriaSeleccionada.nombre}`;
    const contenedorPrincipal = obtenerContenedorPrincipal();
    
    vaciarContenedorPrincipal();
    contenedorPrincipal.style.display ="grid";
    mostrarOpcionesDeOrdenDeProductos();

    crearTituloDeSeccion(subCategoriaSeleccionada, contenedorPrincipal);

    ordenarProductos(subCategoriaSeleccionada.productos);
    subCategoriaSeleccionada.productos.forEach( producto => {
        renderizarProducto(producto, contenedorPrincipal);
    });
};



function renderizarTodosLosProductos() {
    seccionActual="Todos los productos";
    const contenedorPrincipal = obtenerContenedorPrincipal();

    vaciarContenedorPrincipal();
    contenedorPrincipal.style.display ="grid";
    mostrarOpcionesDeOrdenDeProductos();

    const TituloSeccion = document.createElement("div");
    TituloSeccion.className = "contenedorTitulo"
    TituloSeccion.innerHTML = `<h2>Todos los productos</h2><p>`;
    
    establecerColorDeBordeDeElementoSegunTemaActivo(TituloSeccion);
    agregarElementoAlContenedorPrincipal(TituloSeccion);

    ordenarProductos(productos);
    productos.forEach( producto => {
        renderizarProducto(producto, contenedorPrincipal);
    });


};










// -------------- Funciones para crear el nav ----------------------------

const ordenarPorNombreAlfabeticamente = unArray => {
    unArray.sort((item1, item2) => item1.nombre.localeCompare(item2.nombre));
};

const cantidadDeSubcategorias = unaCategoria => unaCategoria.subCategorias.length

function crearNav() {
    //se obtiene el contenedor de las categorias del dom
    const listaCategorias = document.getElementById("listaCategorias");

    ordenarPorNombreAlfabeticamente(categorias);

    //por cada categoria se crea un item con su nombre
    categorias.forEach( categoria => {
        const categoriaAAgregar = document.createElement("li");
        categoriaAAgregar.className = "categoriaNav";
        categoriaAAgregar.innerHTML = categoria.nombre

        // si la categoria tiene subcategorias, se generan 
        if (cantidadDeSubcategorias(categoria) > 0) {

            const subLista = document.createElement("ul");
            subLista.className = "listaDesplegable";   
            
            ordenarPorNombreAlfabeticamente(categoria.subCategorias);

            categoria.subCategorias.forEach( subCategoria => {
                const subCategoriaAAgregar = document.createElement("li");
                subCategoriaAAgregar.className = "subCatergoriaNav";
                subCategoriaAAgregar.innerHTML = subCategoria.nombre;

                subLista.appendChild(subCategoriaAAgregar);
            });

            //Se insertan las subcategorias dentro de la categoria  correspondiente
            categoriaAAgregar.appendChild(subLista);
        }; 

        // se añade la categoria al contenedor 
        listaCategorias.appendChild(categoriaAAgregar);
    });
};

function obtenerSeccionActual() {
    let seccionARenderizar = "Todos los productos";

    subCategorias.forEach( subcategoria =>{
        if (seccionActual === subcategoria.nombre) {
            seccionARenderizar = subcategoria;
        };
    });
    return seccionARenderizar;
};

function establecerComportamientoDeOpcionesDeOrdenDeProducto() {
    const objetoOpciones = document.getElementById("orden");
    objetoOpciones.addEventListener("change", () =>{
        
        const seccionActual = obtenerSeccionActual();

        if (seccionActual === "Todos los productos") {
            renderizarTodosLosProductos();
        } else {
            renderizarSubcategoria(seccionActual);
        }
    })
}

function establecerComportamientoBotonMostrarTodos() {
    const botonMostrarTodos = document.getElementById("botonMostrarTodos");

    botonMostrarTodos.addEventListener("click", ()=> {
        renderizarTodosLosProductos();
    });
};

function establecerComportamientoBotonCarrito() {
    const botonCarrito = document.getElementById("botonCarrito");
    botonCarrito.addEventListener("click", ()=> {
        renderizarCarritoDeCompras();
    });
};


function establecerComportamientoCategoriasDelNav(){

    establecerComportamientoBotonMostrarTodos();

    const subcategoriasNavColeccion = document.getElementsByClassName("subCatergoriaNav");
    const subcategoriasNav = Array.from(subcategoriasNavColeccion);
    
    subcategoriasNav.forEach( item => {
        const nombreItem = item.innerText;

        categorias.forEach(categoria => {
            categoria.subCategorias.forEach(subCategoria => {
                if(nombreItem === subCategoria.nombre) {
                    item.addEventListener(
                        "click", () => renderizarSubcategoria(subCategoria)
                    )
                };
            });
        });
    });
};



function generarYEstablecerComportamientoDelNav() {
    crearNav();
    establecerComportamientoDeOpcionesDeOrdenDeProducto();
    establecerComportamientoCategoriasDelNav();
    establecerComportamientoBotonCarrito();
}

function correrApp() {
    recuperarProductos();
    recuperarCarritoDeCompras();
    establecerComportamientoBotonTema();
    generarYEstablecerComportamientoDelNav();
    actualizarTextoCantidadItemsCarrito();
    renderizarTodosLosProductos();
}

correrApp();


