const marca = document.querySelector("#marca"),
  modelo = document.querySelector("#modelo"),
  talle = document.querySelector("#talle"),
  categoria = document.querySelector("#categoria"),
  precio = document.querySelector("#precio"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  formInventario = document.querySelector("#formInventario");
const radios = document.querySelectorAll('input[type="radio"]');

//Zapatillas guardadas en inv

const inventario = [
  {
    marca: "Nike",
    modelo: "Airmax 90",
    talle: "35 al 43",
    categoria: "Deportivas",
    precio: 81000,
    img: "https://mister-mango.omni.la/ProductCatalog/Workspace.CWDQQL6GUIJMS/ProductCatalog.CWT7AG76SUFUU/1500x1500/CW2F3V3Z6LKM6.jpg",
  },
  {
    marca: "Jordan",
    modelo: "Jordan 1",
    talle: "35 al 43",
    categoria: "Deportivas",
    precio: 99000,
    img: "https://shoesandmorebdn.com/2409-medium_default/nike-air-jordan-one-mid-gris-negras.jpg",
  },
];

//Seteo variables 

let zapatillas;
if(localStorage.getItem("inventario")){
  zapatillas = JSON.parse(localStorage.getItem("inventario"));
}else{
  zapatillas = inventario
}

//Constructor del objeto Shoes

function Shoes(marca, modelo, talle, categoria, precio, img) {
  this.marca = marca;
  this.modelo = modelo;
  this.talle = talle;
  this.categoria = categoria;
  

  //Si campo precio vacío this.precio = 1

  if (precio == "") {
    this.precio = 1;
  } else {
    this.precio = parseFloat(precio);
  }
  //Si campo img vacío this.img genérica

  if (img == "") {
    this.img = `https://via.placeholder.com/150`;
  } else {
    this.img = img;
  }
}

/* Declaración de Funciones */
//Cargar al inventario

function cargarInventario(arr, shoe) {
  arr.push(shoe);
}
//Funciones de ZS

function guardarZS(arr) {
  localStorage.setItem("inventario", JSON.stringify(arr));
}

//Función de búsqueda genérica
function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    if (param == "precio") {
      return el.precio <= parseFloat(filtro);
    } else {
      return el[`${param}`].includes(filtro);
    }
  });
}

//Manipular el DOM

function crearHtml(arr) {
  tbody.innerHTML = "";

  let html = "";
  for (const item of arr) {
    html = `<tr>
  <td>${item.marca}</td>
  <td>${item.modelo}</td>
  <td>${item.talle}</td>
  <td>${item.categoria}</td>
  <td>${item.precio}</td>
  <td><img src="${item.img}"/></td>
  <td><button class="btn red" id="${item.talle}">Borrar</button></td>
  </tr>`;
    tbody.innerHTML += html;
  }
  /* Agregar eventos a los botones */

  const arrayBotones = document.querySelectorAll("td .btn");
  arrayBotones.forEach((btn)=>{
    btn.addEventListener('click',()=>{
      zapatillas = zapatillas.filter((el) => el.talle != btn.id);
      console.log(zapatillas);

      guardarZS(zapatillas);
      crearHtml(zapatillas);
    })
  })
}

/* Fin de funciones */

/* Ejecución de funciones */
crearHtml(zapatillas);

//Listeners
formInventario.addEventListener("submit", (e) => {
  e.preventDefault();

  const newShoe= new Shoes(marca.value,
    modelo.value,
    talle.value,
    categoria.value,
    precio.value,
    img.value)

console.log(newShoe);
cargarInventario(zapatillas, newShoe);
guardarZS(zapatillas)
crearHtml(zapatillas)
formInventario.reset()
});

//Listeners de búsqueda
search.addEventListener("input", () => {
  let nuevoFiltro = filtrar(zapatillas, search.value, "marca");
  crearHtml(nuevoFiltro);
});
//###### RadioButtons
for (const radio of radios) {
  radio.addEventListener("change", () => {
    if (radio.checked) {
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(zapatillas, search.value, radio.value);
        crearHtml(nuevoFiltro);
      });
    }
  });
}
