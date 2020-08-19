//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');




//Listeners
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina el curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar el documento, mostrar Local Storage

    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}





//Funciones
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
        // console.log('si');
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

//Lee los datos del curso

function leerDatosCurso(curso) {

    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    // console.log(infoCurso);

    insertarCarrito(infoCurso);

}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td> ${curso.titulo} </td>
        <td> ${curso.precio} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');

        //console.log(cursoId);
    }

    eliminarCursoLocalStorage(cursoId);
}

//Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    //Forma lenta
    // listaCursos.innerHTML = ``;

    //Forma rapida y recomendada
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //Vaciar Local Storage
    vaciarLocalStorage();

    return false;
}

//Almacena cursos en el carrito a Local Storage
function guardarCursoLocalStorage(curso) {
    let cursos;

    //Toma el valor de un arreglo con datos de Local Storage o vacio
    cursos = obtenerCursosLocalStorage();

    //El curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );
}

//Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
   let cursosLS;

   //Comprobamos si hay algo en Local Storage
   if (localStorage.getItem('cursos') === null) {
       cursosLS = [];
   } else {
       cursosLS = JSON.parse( localStorage.getItem('cursos') );
   }

   return cursosLS;
}

//Imprime los cursos de Local Storage en el carrito

function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso) {
        //Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.precio} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;
    listaCursos.appendChild(row);
    });
}

//Eliminar curso por el ID en Local Storage
function eliminarCursoLocalStorage(curso) {
    //console.log('curso');

    let cursosLS;

    // console.log(curso);

    //Obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();

    //Iteramos comparando el ID del curso robado con los de Local Storage
    cursosLS.forEach(function(cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });

    // console.log(cursosLS);

    //Agregamos el arreglo actual a Storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

//Elimina todos los cursos de Local Storage

function vaciarLocalStorage() {
    localStorage.clear();
}
