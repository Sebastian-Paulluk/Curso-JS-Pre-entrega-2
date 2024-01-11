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



/* ------------------------ Categorias > subcategorias > productos ------------------- */

// Se pueden agregar más modificando estos arrays



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



/* Coleccion de productos por defecto */
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






// --- Funciones para cargar las subcategorias a
// --- sus respectivas categorias padre

const agregarSubcategoriaACategoria = (subcategoria, categoria) =>{
    if (subcategoria.idCategoria === categoria.id) {
        categoria.subCategorias.push(subcategoria);
    };
};

categorias.forEach(categoria => {
    subCategorias.forEach(subcategoria => {
        agregarSubcategoriaACategoria(subcategoria, categoria);
    });
});



// --- Funciones auxiliares

const obtenerPrecioTotalDelCarrito =()=> {
    return carrito.reduce ((total, item) => {
        const producto = buscarProductoPorId(item.id);
        return total + (producto.precio * item.cantidad);
    }, 0);
};

const buscarProductoPorId = id => {
    const producto = productos.find( productoBuscado => productoBuscado.id === id);
    return producto;
};



// --- Funciones auxilares para el contenedor principal

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



// --- Funciones para mostrar u ocultar
// --- la opcion de ordenar productos

const ocultarOpcionesDeOrdenDeProductos = function() {
    contItemsFiltros = document.getElementById("contItemsFiltros");

    contItemsFiltros.style.visibility = "hidden";
    contItemsFiltros.style.pointerEvents = "none";
};

const mostrarOpcionesDeOrdenDeProductos = function() {
    contItemsFiltros = document.getElementById("contItemsFiltros");

    contItemsFiltros.style.visibility = "visible";
    contItemsFiltros.style.pointerEvents = "auto";
};






// --------------------------------- Funciones para guardar y recuperar el carrito localmente ----------



const recuperarCarritoDeCompras = function() {
    const carritoGuardado = localStorage.getItem('carrito');
    // Si el array en localStorage existe, establecemos el array obtenido
    // como nuestro array de carrito actual
    if (carritoGuardado) {     
        carrito = JSON.parse(carritoGuardado);
    };
};

const guardarCarritoLocalmente = function() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};






// --------------------------- Funciones para guardar y recuperar los productos de localStorage --------------------



const agregarProductoASubcategoria = function(producto, subcategoria) {
    if (producto.idSubCategoria === subcategoria.id) {
        subcategoria.productos.push(producto);
    };
};

const cargarProductosASubcategorias = function() {
    subCategorias.forEach(subcategoria => {
        productos.forEach(producto => {
            agregarProductoASubcategoria(producto, subcategoria);
        });
    });
}

/* Recupera el array de productos de localStorage */
const recuperarProductos = function() {
    const productosRecuperados = localStorage.getItem('productos'); // Obtenemos el array de localStorage

    // Si el array en localStorage existe, establecemos el array obtenido
    // como nuestro array de productos actual, y cargarmos los productos
    // a sus subcategorias correspondientes
    if (productosRecuperados) { 
        productos = JSON.parse(productosRecuperados);
        cargarProductosASubcategorias();
    } else {
    // Si el array en localStorage no existe, cargamos a la coleccion de
    // productos de las subcategorias los productos por defecto
        cargarProductosASubcategorias();
    };

};


/* Guarda el array de productos en localStorage */
const guardarProductosLocalmente = function() {
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

/* Funcion para manejar el boton que cambia el tema (Claro/oscuro) de la pagina */
const establecerComportamientoBotonTema = function () {
    const botonTema = document.getElementById("botonTema");
    botonTema.addEventListener("click", () => {
        
        cambiarTemaActual();
        // Añade la clase "temaOscuro" al body, la cual cambia su color fondo y de texto
        document.body.classList.toggle("temaOscuro"); 

        // Añade a todos los elementos de la pagina la clase "bordeTemaOscuro",
        // la cual cambia su color de borde
        const todosLosElementos = document.querySelectorAll('*');
        todosLosElementos.forEach(elemento => {
            elemento.classList.toggle("bordeTemaOscuro");
        });
    });
};






// ------------------------------ Funciones para generar finalizacion de la compra -----------------



const crearSeccionCompraFinalizada = function() {
    vaciarContenedorPrincipal();
    vaciarCarrito();

    const contenedorCompraFinalizada = document.createElement("div");
    contenedorCompraFinalizada.id = "contenedorCompraFinalizada";
    contenedorCompraFinalizada.innerHTML ='<h1>¡Gracias por su compra!</h2>';

    // Se crea el boton de "Volver" al finalizar la compra, el cual
    // devuelve la pagina a la seccion de "todos los productos"
    const botonVolver = document.createElement("button");
    botonVolver.id = "botonVolver";
    botonVolver.innerText = "Volver";
    botonVolver.addEventListener("click", ()=> {
        renderizarTodosLosProductos(); 
    });

    contenedorCompraFinalizada.appendChild(botonVolver);
    
    agregarElementoAlContenedorPrincipal(contenedorCompraFinalizada);    
};






// --------------------------------- Funciones para generar la seccion de pago -------------------------



/*  Funcion para actualizar el texto de cantidad de items que se
    encuentra al lado del boton del carrito. */
const actualizarTextoCantidadItemsCarrito = function() {
    const textoCantItemsEnCarrito = document.getElementById('textoCantItemsEnCarrito');
    textoCantItemsEnCarrito.innerText = `(${carrito.reduce((total, producto) => total + producto.cantidad, 0)})`;
};

const vaciarCarrito =()=> carrito.length = 0;

/* Funcion para que, en caso de venta exitosa, se vacíe el carrito y se guarde localmente */
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

/* Funcion para renderizar los botones de confirmación o cancelación de pago*/
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

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(seccion);

    agregarElementoAlContenedorPrincipal(seccion);
};

/* Funcion que genera el contenedor con la pregunta de confirmacion de pago*/
const crearConfirmacionDePago=(nroTarjeta)=>{
    const confirmacionDePago = document.createElement("div");
    confirmacionDePago.id ="contenedorConfirmacionPago";
    confirmacionDePago.innerHTML = `
        <h1 id="preguntaConfirmacion">¿Confirma el pago?</h1>
        <h3 id="precioConfirmacion">Abona $ ${obtenerPrecioTotalDelCarrito().toLocaleString()}</h3>
        <h3 id="nroTarjetaConfirmacion">Con la tarjeta número ${nroTarjeta}</h3>
    `;

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(confirmacionDePago);
    agregarElementoAlContenedorPrincipal(confirmacionDePago);
};

function crearSeccionConfirmacionDePago(nroTarjeta) {
    vaciarContenedorPrincipal();

    crearTituloConfirmacionPago();
    crearConfirmacionDePago(nroTarjeta);
    crearBotonesConfirmacion();
};






// -------------------------- Funciones para generar la seccion de pago -------------------------


/* Funcion para obtener los valores ingresados en los inputs del form */
const obtenerDatos =()=> {
    const inputNombre = document.getElementById("nombre");
    const inputNroTarjeta = document.getElementById("nroTarjeta");
    const inputMesDeVencimiento = document.getElementById("mesDeVencimiento");
    const inputAnioDeVencimiento = document.getElementById("anioDeVencimiento");
    const inputCodigoSeguridad = document.getElementById("codigoSeguridad");

    const datos = [ // array con los valores
        inputNombre.value,
        inputNroTarjeta.value,
        inputMesDeVencimiento.value,
        inputAnioDeVencimiento.value,
        inputCodigoSeguridad.value,
    ]

    return datos;
}


// --------- Validaciones

/* Funcion que genera el texto de aviso de error de validacion en los inputs ingresados
   y les agrega la clase para que se muestre el borde rojo, por 3 segundos */
const generarErrorDeValidacion =(input, span, textoDeError)=> {
    input.classList.add('error');
    span.innerText = textoDeError;
    setTimeout(function() {
        span.innerText = "";
        input.classList.remove('error');
    }, 3000);
}


/* Funcion que valida que el codigo de seguridad de la tarjeta ingresada */
// - La cantidad de carateres tiene que ser igual a 3
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


/* Funcion que valida que el año de vencimiento de la tarjeta ingresado */
// - El numero ingresado tiene que estar entre 1920 y 2006 
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


/* Funcion que valida que el mes de vencimiento de la tarjeta ingresado */
// - El numero ingresado tiene que estar entre 1 y 12 
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


/* Funcion que valida que el numero de la tarjeta ingresada */
// - La cantidad de carateres tiene que ser igual a 16 
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


/* Funcion que valida que el nombre ingresado */
// - El input no puede estar vacio 
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


    // Se crea el boton continuar de la seccion de pago, el cual envia a validar
    // los datos ingresados en el form
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

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(contenedorForm);

    agregarElementoAlContenedorPrincipal(contenedorForm); // Se agrega al DOM el form
};

const crearTituloSeccionPago = () => {
    const seccion = document.createElement("div");
    seccion.className = "contenedorTitulo"
    seccion.innerHTML = `<h2>Pago</h2><p>`;

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(seccion);

    agregarElementoAlContenedorPrincipal(seccion); // Se agrega al DOM el contenedor con el titulo
};


function renderizarSeccionPago() {
    vaciarContenedorPrincipal();
    crearTituloSeccionPago();
    crearFormDeDatosDelPago();
    crearBotonContinuar();
};






// ----------------------------- Funciones para agregar productos al carrito --------------------



const descontarStockDelProducto = producto => producto.stock -= 1;


/* Funcion para actualizar el texto de cantidad de stock restante del producto que
se acaba de agregar al carrito de compras. */
function actualizarStockDelProductoEnElDOM(producto) {
    const TextoDeStockAtualDelProducto = document.querySelector(`#${producto.id} .stockProducto`);
    TextoDeStockAtualDelProducto.innerText = `Stock: ${producto.stock}`;
};


const agregarProductoACarrito = function(producto) {
    //Se obtiene el indice el producto seleccionado, en el array del carrito de compras
    const indiceDelProducto = carrito.findIndex (item => item.id === producto.id);

    if (indiceDelProducto !== -1) {
        carrito[indiceDelProducto].cantidad += 1; // Si se encuentra el producto en el carrito, se aumenta su cantidad
    } else {
        carrito.push({id: producto.id, cantidad: 1}); //Se no se encuentra el producto en el carrito, se agrega
    }

    descontarStockDelProducto(producto);
    actualizarStockDelProductoEnElDOM(producto);
    guardarCarritoLocalmente();
    guardarProductosLocalmente();
    actualizarTextoCantidadItemsCarrito();
};


const comprobarSiHayStockParaAgregarAlCarrito = producto => {
    if (producto.stock > 0) {
        agregarProductoACarrito(producto);
    };
};






// ----------------------- Funciones para descartar productos del carrito ------------------



const devolverStockAProducto = function(producto, cantidad) {
    producto.stock += cantidad;
};

const quitarProductoDelCarrito = function(producto){
    const indiceDelProductoADescartar = carrito.findIndex(item => item.id === producto.id);

    // Si se encuentra el producto en el carrito, se devuelve la cantidad del producto
    // al stock del mismo, y luego se remueve del carrito
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






// -------------------- Funciones para generar el carrito -----------------------------------



const renderizarProductoEnCarrito = function(productoEnCarrito, contenedor) {
    const producto = buscarProductoPorId(productoEnCarrito.id);
    const indiceDelProductoEnElCarrito = carrito.findIndex (item => item.id === producto.id);

    // Se genera el codigo para para el DOM del producto del carrito, 
    // con su imagen, precio, cantidad y subtotal
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

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(contenedorProductoEnCarrito);

    contenedor.appendChild(contenedorProductoEnCarrito);

    // Se genera el boton para descartar el producto del carrito
    const botonDescartarProducto = document.createElement("button");
    botonDescartarProducto.className = "botonesDescartarProducto";
    botonDescartarProducto.innerText = "Descartar";
    botonDescartarProducto.addEventListener("click", ()=> {
        descartarProductoDelCarrito(producto);
    });

    const contPrecioProducto = document.getElementById(`contenedorPrecio${producto.id}`);
    // Se agrega el boton al contenedor del producto
    contPrecioProducto.appendChild(botonDescartarProducto);
};


const mostrarProductosEnCarrito = function() {
    const contenedorPrincipal = obtenerContenedorPrincipal();

    // Se renderiza cada uno de los productos del carrito
    carrito.forEach(producto => {
            renderizarProductoEnCarrito(producto, contenedorPrincipal);
    });
};


const mostrarPrecioTotalEnCarrito = function() {
    const contenedorPrecioTotalCarrito = document.createElement("div");
    contenedorPrecioTotalCarrito.id = "contenedorPrecioTotalCarrito";

    const precioTotal = obtenerPrecioTotalDelCarrito();
  
    contenedorPrecioTotalCarrito.innerHTML = `<h2>Total: $ ${precioTotal.toLocaleString()}</h2>`;

    agregarElementoAlContenedorPrincipal(contenedorPrecioTotalCarrito);
};


const crearBotonPagarEnCarrito = function() {
    const botonPagarCarrito = document.createElement("button");
    botonPagarCarrito.id="botonPagarCarrito";
    botonPagarCarrito.innerText= "Pagar";

    botonPagarCarrito.addEventListener("click", () => {
        renderizarSeccionPago();
    });

    const contenedorPrecioTotalCarrito = document.getElementById("contenedorPrecioTotalCarrito");
    contenedorPrecioTotalCarrito.appendChild(botonPagarCarrito);
};


/* Funcion para mostrar aviso de que el carrito de compras no contiene productos */
const mostrarAvisoDeCarritoVacio = function() {
    const avisoDeCarritoVacio = document.createElement("div");
    avisoDeCarritoVacio.id = "contTextoAvisoCarritoVacio";
    avisoDeCarritoVacio.innerHTML = '<h2>No hay productos en el carrito</h2>';

    agregarElementoAlContenedorPrincipal(avisoDeCarritoVacio);
};


const comprobarSiHayProductosEnElCarrito = function() {
    // Si el carrito tiene productos, se renderizan en el DOM
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

    const contenedorPrincipal = obtenerContenedorPrincipal();
    contenedorPrincipal.style.display ="flex"
    contenedorPrincipal.style.flexDirection = "column"

    const TituloSeccion = document.createElement("div");
    TituloSeccion.className = "contenedorTitulo"
    TituloSeccion.innerHTML = `<h2>Carrito</h2><p>`;

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(TituloSeccion);

    agregarElementoAlContenedorPrincipal(TituloSeccion);

    comprobarSiHayProductosEnElCarrito();
};






// -------------- Funciones para generar el contenido de las categorias -----------------



const obtenerIDEnNumero = producto => parseInt(producto.id.slice(1));

/* Funciones para establecer el orden de los productos en su array */
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


/* Funcion para obtener la seleccion de orden de los productos desde el DOM */
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

/* Funcion para obtener el nombre de la categoria padre de una subcategoria */
const obtenerNombreDeCategoriaPadre = function(subCategoria) {
    let nombreCategoriaPadre = ""
    categorias.forEach( categoria => {
        if (categoria.id === subCategoria.idCategoria) {
            nombreCategoriaPadre = categoria.nombre;
        }
    });
    return nombreCategoriaPadre;
};


/* Funcion para crear y agregar el titulo de la seccion. */
const crearTituloDeSeccion = function(seccionSeleccionada, contenedor) {
    const nombreDeCategoriaPadre = obtenerNombreDeCategoriaPadre(seccionSeleccionada);

    const seccion = document.createElement("div");
    seccion.className = "contenedorTitulo"
    seccion.innerHTML = `<p>${nombreDeCategoriaPadre}<p><h2>${seccionSeleccionada.nombre}</h2>`;

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(seccion);

    contenedor.appendChild(seccion);  // Se agrega al DOM el contenedor con el titulo
};


const renderizarBotonAgregarAlCarrito = function(producto) {

    const botonAgregarAlCarrito = document.createElement("button");
    botonAgregarAlCarrito.className = "botonAgregarAlCarrito";
    botonAgregarAlCarrito.innerText = "Agregar al carrito";

    botonAgregarAlCarrito.addEventListener("click", () =>{
        comprobarSiHayStockParaAgregarAlCarrito(producto);
    });

    productoAInsertarBoton = document.getElementById(`${producto.id}`);
    productoAInsertarBoton.appendChild(botonAgregarAlCarrito);
};


const renderizarProducto = function(producto, contenedor) {

    // Se genera el contenedor del producto y dentro de él,
    // la imagen, descripcion, precio y stock
    const productoAAgregar = document.createElement("div");
    productoAAgregar.className = "contenedorProducto";
    productoAAgregar.id = `${producto.id}`;
    productoAAgregar.innerHTML =`
        <img src="./assets/imgs_productos/${producto.id}.png"> 
        <p class="descripcionProducto">${producto.descripcion}</p>
        <p class="precioProducto">$ ${producto.precio.toLocaleString()}</p>
        <p class="stockProducto">Stock: ${producto.stock}</p>
    `;

    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(productoAAgregar);

    contenedor.appendChild(productoAAgregar); // Se agrega al DOM el contenedor con el producto

    // Se agrega en boton para agregar al carrito el producto
    renderizarBotonAgregarAlCarrito(producto);
};


const renderizarSubcategoria = function(subCategoriaSeleccionada) {
    seccionActual=`${subCategoriaSeleccionada.nombre}`;
    const contenedorPrincipal = obtenerContenedorPrincipal();
    
    vaciarContenedorPrincipal();
    contenedorPrincipal.style.display ="grid";
    mostrarOpcionesDeOrdenDeProductos(); // Se hace visible la opcion de orden

    crearTituloDeSeccion(subCategoriaSeleccionada, contenedorPrincipal); // Se agrega al DOM el titulo de la seccion

    // Antes de renderizar los productos, se ordena la ubicacion de cada uno
    // en el array de productos en base al orden seleccionado
    ordenarProductos(subCategoriaSeleccionada.productos);

    // Se renderiza cada producto de la categoria seleccionada
    subCategoriaSeleccionada.productos.forEach( producto => {
        renderizarProducto(producto, contenedorPrincipal);
    });
};


function renderizarTodosLosProductos() {
    seccionActual="Todos los productos";
    mostrarOpcionesDeOrdenDeProductos(); // Se hace visible la opcion de orden
    vaciarContenedorPrincipal();

    const contenedorPrincipal = obtenerContenedorPrincipal();
    contenedorPrincipal.style.display ="grid";
    vaciarContenedorPrincipal();

    // Se genera el titulo de la seccion
    const TituloSeccion = document.createElement("div");
    TituloSeccion.className = "contenedorTitulo"
    TituloSeccion.innerHTML = `<h2>Todos los productos</h2><p>`;
    
    // En base al tema seleccionado (claro/oscuro), se añade
    // una clase al elemento para determinar el color de su borde
    establecerColorDeBordeDeElementoSegunTemaActivo(TituloSeccion);

    // Se agrega al DOM el titulo de la seccion
    agregarElementoAlContenedorPrincipal(TituloSeccion);

    // Antes de renderizar los productos, se ordena la ubicacion de cada uno
    // en el array de productos en base al orden seleccionado
    ordenarProductos(productos);

    // Se renderizan todos los productos
    productos.forEach( producto => {
        renderizarProducto(producto, contenedorPrincipal);
    });
};






// -------------------------- Funciones para crear el nav ---------------------------- 



const ordenarPorNombreAlfabeticamente = unArray => {
    unArray.sort((item1, item2) => item1.nombre.localeCompare(item2.nombre));
};


const cantidadDeSubcategorias = unaCategoria => unaCategoria.subCategorias.length


const crearNav = function() {
    // Por cada categoria se crea un item 
    categorias.forEach( categoria => {
        const categoriaAAgregar = document.createElement("li");
        categoriaAAgregar.className = "categoriaNav";
        categoriaAAgregar.innerHTML = categoria.nombre

        // Si la categoria tiene subcategorias, se generan 
        if (cantidadDeSubcategorias(categoria) > 0) {

            const subLista = document.createElement("ul"); // Lista que contendra las subcategorias
            subLista.className = "listaDesplegable";   
            
            ordenarPorNombreAlfabeticamente(categoria.subCategorias);
            
            // Por cada categoria se crea un item
            categoria.subCategorias.forEach( subCategoria => {
                const subCategoriaAAgregar = document.createElement("li");
                subCategoriaAAgregar.className = "subCategoriaNav";
                subCategoriaAAgregar.innerHTML = subCategoria.nombre;

                subLista.appendChild(subCategoriaAAgregar); 
            });

            categoriaAAgregar.appendChild(subLista);
        }; 

        // Se agrega la categoria al contenedor 
        const listaCategorias = document.getElementById("listaCategorias");
        listaCategorias.appendChild(categoriaAAgregar);
    });
};


/* Se obtiene la seccion actual, a fin de poder renderizarla nuevamente
cuando se cambia el orden de los productos mostrados */
const obtenerSeccionActual = function() {
    let seccionARenderizar = "Todos los productos";

    subCategorias.forEach( subcategoria =>{
        if (seccionActual === subcategoria.nombre) {
            seccionARenderizar = subcategoria;
        };
    });
    return seccionARenderizar;
};


/* Se establece la accion del cambio de opcion seleccionada del select 
del DOM, el cual establece el orden de los productos mostrados */
const establecerComportamientoDeOpcionesDeOrdenDeProducto = function() {
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


/* Se establece la renderizacion de todos los productos en el DOM
cuando se hace click en boton "Todos los productos" del nav */
const establecerComportamientoBotonMostrarTodos = function() {
    const botonMostrarTodos = document.getElementById("botonMostrarTodos");

    botonMostrarTodos.addEventListener("click", ()=> {
        renderizarTodosLosProductos();
    });
};


/* Se establece la renderizacin del carrito de compras en el DOM
cuando se hace click en boton del carrito del nav */
const establecerComportamientoBotonCarrito = function() {
    const botonCarrito = document.getElementById("botonCarrito");

    botonCarrito.addEventListener("click", ()=> {
        renderizarCarritoDeCompras();
    });
};



const establecerComportamientoCategoriasDelNav = function(){

    establecerComportamientoBotonMostrarTodos();

/*  Se obtienen del DOM las subcategorias del nav */
    const subcategoriasNavColeccion = document.getElementsByClassName("subCategoriaNav");
    const subcategoriasNav = Array.from(subcategoriasNavColeccion);

/*  Por cada una, se programa la accion de click para renderizar en el DOM
    la subcategoria seleccionada */
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


const generarYEstablecerComportamientoDelNav = function() {
    crearNav();
    establecerComportamientoDeOpcionesDeOrdenDeProducto();
    establecerComportamientoCategoriasDelNav();
    establecerComportamientoBotonCarrito();
}


const correrApp = function() {
    recuperarProductos();
    recuperarCarritoDeCompras();
    establecerComportamientoBotonTema();
    generarYEstablecerComportamientoDelNav();
    actualizarTextoCantidadItemsCarrito();
    renderizarTodosLosProductos();
}


correrApp();


