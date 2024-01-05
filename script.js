class Categoria {
    constructor(nombre, subCategorias){
        this.nombre = nombre
        this.subCategorias = subCategorias
    }
};

class Subcategoria {
    constructor(tipo, nombre, productos){
        this.tipo = tipo
        this.nombre = nombre
        this.productos = productos
    }
};

class Producto {
    constructor(id, tipo, descripcion, stock, precio){
        this.id = id;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precio = precio;
    }
};

const categorias = [
    ropa = new Categoria ("Ropa", []),
    electrodomesticos = new Categoria ("Electrodomésticos", [])
];

const subCategorias = [
    calzado = new Subcategoria (ropa, "Calzado", []),
    remeras = new Subcategoria (ropa, "Remeras", []),

    heladeras = new Subcategoria (electrodomesticos, "Heladeras", []),
    lavado = new Subcategoria (electrodomesticos, "Lavado", [])
];

const productos = [
    zapatillas = new Producto(100, calzado, "Zapatillas Nike Court Legacy Lift", 5, 95000),
    zapatillas = new Producto(101, calzado, "Zapatillas Converse Chuck Taylor All Star Ox", 9, 61500),
    remera = new Producto(102, remeras, "Remera Puma Essentials", 10, 12800),
    remera = new Producto(103, remeras, "Musculosa Lotto Basic", 8, 7200),
    heladera = new Producto(104, heladeras, "Heladera Philco Top Mount 290 L PHCT291B", 6, 430000),
    lavarropas = new Producto(105, lavado, "Lavarropas Drean Automático NEXT 6 kg", 4, 585000),
];

subCategorias.forEach( subcategoria => {
    productos.forEach( producto => {
        if (producto.tipo === subcategoria) {
            subcategoria.productos.push(producto);
        }
    });
});

categorias.forEach( categoria => {
    subCategorias.forEach( subcategoria => {
        if (subcategoria.tipo === categoria) {
            categoria.subCategorias.push(subcategoria);
        };
    });
});




// -------------- Funcion para generar el titulo y los productos de la categoria elegida

function crearContenidoDeSubCategoria(subCategoriaSeleccionada) {
    const contenedorPrincipal = document.getElementById("contenedorPrincipal");
    contenedorPrincipal.innerHTML = "";

    // se crea el titulo de la seccion al html
    const tituloSubCategoria = document.createElement("div");
    tituloSubCategoria.className = "contenedorTitulo"
    tituloSubCategoria.innerHTML = `<h2>${subCategoriaSeleccionada.nombre}</h2>`;
    contenedorPrincipal.appendChild(tituloSubCategoria);

    // se agregan los productos de la seccion al html
    subCategoriaSeleccionada.productos.forEach( producto => {
        const productoAAgregar = document.createElement("div");
        productoAAgregar.className = "contenedorProducto";
        productoAAgregar.innerHTML =`
            <img src="./imgs/${producto.id}.png">
            <p>${producto.descripcion}</p>
        `;
        contenedorPrincipal.appendChild(productoAAgregar);
    });
};



// -------------- Funciones para crear el nav

const cantidadDeSubcategorias = unaCategoria => unaCategoria.length

function crearNav() {
    const itemsDelNav = []; // array para armar el html del nav

    categorias.forEach( categoria => {
        // comprobar si la categoria no tiene subcategorias
        if (cantidadDeSubcategorias(categoria) === 0) {
            itemsDelNav.push(`<li>${categoria.nombre}</li>`);
        } else {
        // si tiene subcategorias, se añaden al array que prepara el codigo html del nav
            subCategoriasParaElNav = []
            categoria.subCategorias.forEach( subCategoria => {
                subCategoriasParaElNav.push(`<li class="subCatergoriaNav">${subCategoria.nombre}</li>`);
            });
            itemsDelNav.push(`
                <li>${categoria.nombre}
                    <ul class="menuDesplegable">
                        ${subCategoriasParaElNav.join('')}
                    </ul>
                </li>`
            );
        };
    });
    const nav = document.createElement("nav");
    nav.innerHTML = `<ul>${itemsDelNav.join('')}</ul>`

    const header = document.getElementById("header");
    header.appendChild(nav);
};

function establecerComportamientoDeNav(){
    const itemsNavColeccion = document.getElementsByClassName("subCatergoriaNav");
    const itemsNav = Array.from(itemsNavColeccion);

    itemsNav.forEach( item => {
        const nombreItem = item.innerText;

        categorias.forEach(categoria => {
            categoria.subCategorias.forEach(subCategoria => {
                if(nombreItem === subCategoria.nombre) {
                    item.addEventListener(
                        "click", () => crearContenidoDeSubCategoria(subCategoria)
                    )
                };
            });
        });
    });
};



crearNav();
establecerComportamientoDeNav();

