// @todo Podríamos revisar cualquier código que se repita para convertirlo en funciones y hacer el código más legible y compacto. - Juani

function leerAlumnos(inicio, listaAlumnos) {
    // Revisa si la función se llamó con un argumento para determinar que datos cargar.
    if (listaAlumnos) {
        // Si el array del argumento está vacio o es nulo, alerta al usuario y sale de la función.
        if (listaAlumnos == null || listaAlumnos.length == 0) {
            alert("No se encontraron resultados.");
            return;
        }
        var alumnos = listaAlumnos; // Setea la variable alumnos con el valor argumentado.
    } else {
        // Se cargan y parsean los datos almacenados en el Localstorage.
        let jsonData = localStorage.getItem('alumnos');
        var alumnos = JSON.parse(jsonData);
    }
    let indice = 0;

    // Se obtiene el valor de la tabla en el DOM.
    const bodyAlumnos = document.getElementById('bodyAlumnos');

    // Limpia las entradas de la tabla ya presentes para evitar que se repitan.
    while (bodyAlumnos.childNodes.length > 0) {
        bodyAlumnos.removeChild(bodyAlumnos.firstChild);
    }

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if ((alumnos == null || alumnos.length == 0) && !inicio) {
        alert('No hay datos cargados.');
    } else if ((alumnos == null || alumnos.length == 0) && inicio) { // Esta condicional es para evitar un error en consola.
        return;
    } else {
        // Itera el JSON.
        for (let j of alumnos) {

            // Setea las variables con los valores del alumno iterado.
            let dni = j.dni;
            let apellido = j.apellido;
            let nombre = j.nombre;
            let fechaNac = j.nacimiento;
            let pais = j.pais;
            let email = j.email;
            let numCelu = j.numCelu;

            // Creación del nodo tr.
            let row = document.createElement('tr');
            row.setAttribute('id', 'tr' + indice);

            // Creación de los nodos td, misma cantidad que la tabla original.
            let cel0 = document.createElement('td');
            let cel1 = document.createElement('td');
            let cel2 = document.createElement('td');
            let cel3 = document.createElement('td');
            let cel4 = document.createElement('td');
            let cel5 = document.createElement('td');
            let cel6 = document.createElement('td');
            let cel7 = document.createElement('td');
            let cel8 = document.createElement('td');

            // Nodos de texto.
            let txt0 = document.createTextNode(indice);
            let txt1 = document.createTextNode(dni);
            let txt2 = document.createTextNode(apellido);
            let txt3 = document.createTextNode(nombre);
            let txt4 = document.createTextNode(fechaNac);
            let txt5 = document.createTextNode(pais);
            let txt6 = document.createTextNode(email);
            let txt7 = document.createTextNode(numCelu);

            // Creación de los botones "Editar" y "Eliminar".
            let boton = document.createElement('button');
            let action = 'eliminar' + indice;

            let boton2 = document.createElement('button')
            let acto = 'editar' + indice;

            /* 
            Estas funciones permiten que los botones "Editar" y "Eliminar" llamen a las funciones con el índice correcto.
            El método usado para obtener los índices podría ser mejor, posiblemente, pero sirve por ahora.
            */
            boton.setAttribute('id', action);
            boton.addEventListener('click', function () {
                indiceEliminar = boton.id.slice(8) // Obtiene el índice a partir del id del botón.
                eliminarAlumno(indiceEliminar);
            });

            boton2.setAttribute('id', acto);
            boton2.addEventListener('click', function () {
                indiceEditar = boton2.id.slice(6)
                abrirModalAlumno(indiceEditar);
            });

            // Crea los nódos de texto para los botones "Editar" y "Eliminar".
            let txt8 = document.createTextNode('Eliminar');
            let txt9 = document.createTextNode('Editar')

            // Armado de nodos DOM.
            cel0.appendChild(txt0);
            cel1.appendChild(txt1);
            cel2.appendChild(txt2);
            cel3.appendChild(txt3);
            cel4.appendChild(txt4);
            cel5.appendChild(txt5);
            cel6.appendChild(txt6);
            cel7.appendChild(txt7);

            boton.appendChild(txt8);
            boton2.appendChild(txt9);
            cel8.appendChild(boton);
            cel8.appendChild(boton2);

            row.appendChild(cel0);
            row.appendChild(cel1);
            row.appendChild(cel2);
            row.appendChild(cel3);
            row.appendChild(cel4);
            row.appendChild(cel5);
            row.appendChild(cel6);
            row.appendChild(cel7);
            row.appendChild(cel8);

            bodyAlumnos.appendChild(row);

            indice++;
        }
    }
}

function guardarAlumnos() {
    // Obtén los valores de los campos del formulario
    let dniInput = document.getElementById('dni');
    let apellidoInput = document.getElementById('apellido');
    let nombreInput = document.getElementById('nombre');
    let fechaNacInput = document.getElementById('fechaNac');
    let paisInput = document.getElementById('pais');
    let emailInput = document.getElementById('email');
    let numCeluInput = document.getElementById('numCelu');

    // Verifica si algún campo está vacío
    if (
        !dniInput.value ||
        !apellidoInput.value ||
        !nombreInput.value ||
        !fechaNacInput.value ||
        !paisInput.value ||
        !emailInput.value ||
        !numCeluInput.value
    ) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Parsea los datos del JSON existente a un objeto JS o crea un array nuevo si no hay datos
    let alumnos = localStorage.getItem('alumnos');
    let dataArray = alumnos ? JSON.parse(alumnos) : [];

    // Crea un objeto con los datos del formulario
    let alumnoDatos = {
        dni: dniInput.value,
        apellido: apellidoInput.value,
        nombre: nombreInput.value,
        nacimiento: fechaNacInput.value,
        pais: paisInput.value,
        email: emailInput.value,
        numCelu: numCeluInput.value
    };

    // Ingresa los datos del alumno al array
    dataArray.push(alumnoDatos);

    // Convierte el valor JS del array a un JSON string y lo guarda en el localStorage
    let jsonData = JSON.stringify(dataArray);
    localStorage.setItem('alumnos', jsonData);

    // Limpia los campos del formulario después de guardar los datos
    dniInput.value = '';
    apellidoInput.value = '';
    nombreInput.value = '';
    fechaNacInput.value = '';
    paisInput.value = 'Argentina';
    emailInput.value = '';
    numCeluInput.value = '';

    // Carga la tabla.
    leerAlumnos();
}

function borrarLocalAlumnos() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('alumnos');
    let alumnos = JSON.parse(jsonData);

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if (alumnos == null) {
        alert('No hay datos cargados para borrar.');
    } else {
        localStorage.removeItem('alumnos'); // Elimina el JSON entero del localstorage.

        // Limpia las entradas de la tabla.
        const bodyAlumnos = document.getElementById('bodyAlumnos');
        while (bodyAlumnos.childNodes.length > 0) {
            bodyAlumnos.removeChild(bodyAlumnos.firstChild);
        }
    }
}

function editarAlumno(indice) {
    // Setea variables con los campos del modal.
    let dni = document.getElementById('dniModal');
    let apellido = document.getElementById('apellidoModal');
    let nombre = document.getElementById('nombreModal');
    let fechaNac = document.getElementById('fechaNacModal');
    let pais = document.getElementById('paisModal');
    let email = document.getElementById('emailModal');
    let numCelu = document.getElementById('numCeluModal');

    // Crea un JSON con los datos del formulario.
    let alumnoDatos = {
        dni: dni.value,
        apellido: apellido.value,
        nombre: nombre.value,
        nacimiento: fechaNac.value,
        pais: pais.value,
        email: email.value,
        numCelu: numCelu.value
    }

    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('alumnos');
    let alumnos = JSON.parse(jsonData);

    // Actualiza los datos del alumno.
    alumnos[indice] = alumnoDatos;

    // Guarda los datos actualizados en el local.
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    // Cierra el modal.
    let modal = document.getElementById('myModal');
    modal.style.display = 'none';

    // Recarga la tabla.
    leerAlumnos();
}

function abrirModalAlumno(indice) {
    // Obtiene el elemento DOM del modal.
    let modal = document.getElementById('myModal');

    // Obtiene el <span> que cierra el modal.
    let closeBtn = document.getElementsByClassName('close')[0];

    // Hace al modal visible.
    modal.style.display = 'block';

    // Cierra el modal cuando se clickea el botón de cerrar.
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cierra el modal si el usuario clickea afuera del area del modal.
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('alumnos');
    let alumnos = JSON.parse(jsonData);

    // Obtiene los datos según el índice.
    let alumno = alumnos[indice];

    // Setea las variables con los campos del modal.
    let campoDni = document.getElementById('dniModal');
    let campoApellido = document.getElementById('apellidoModal');
    let campoNombre = document.getElementById('nombreModal');
    let campoFechaNac = document.getElementById('fechaNacModal');
    let campoPais = document.getElementById('paisModal');
    let campoEmail = document.getElementById('emailModal');
    let campoNumCelu = document.getElementById('numCeluModal')

    // Setea los valores de los campos con los valores del alumno.
    campoDni.value = alumno.dni;
    campoApellido.value = alumno.apellido;
    campoNombre.value = alumno.nombre;
    campoFechaNac.value = alumno.nacimiento;
    campoPais.value = alumno.pais;
    campoEmail.value = alumno.email;
    campoNumCelu.value = alumno.numCelu;

    // Esta variable almacena una función, y existe para prevenir que el EventListener de botonGuardar se vuelva recursivo.
    let guardarButtonClickHandler = function () {
        editarAlumno(indice);
        botonGuardar.removeEventListener('click', guardarButtonClickHandler); // Elimina el EventListener para evitar la recursión.
    };

    // Obtiene el botón "Guardar datos" y llama a la función editarAlumno() al presionar dicho botón.
    botonGuardar = document.getElementById("guardarLocalModal");
    botonGuardar.addEventListener('click', guardarButtonClickHandler);
}

function eliminarAlumno(indice) {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let datos = localStorage.getItem('alumnos');
    let jsonDatos = JSON.parse(datos);

    // Elimina al alumno del array.
    jsonDatos.splice(indice, 1);

    // Guarda los datos actualizados.
    localStorage.setItem('alumnos', JSON.stringify(jsonDatos));

    // Elimina la fila correspondiente al alumno de la tabla.
    // Llamar a la función leerAlumnos() no es el método más elegante, pero funciona.
    leerAlumnos();
}

function buscarAlumno() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('alumnos');
    let alumnos = JSON.parse(jsonData);

    // Retorna una alerta si el JSON no existe o está vacio y cancela la busqueda.
    if (alumnos == null || alumnos.length == 0) {
        alert("No se encontraron resultados.");
        return;
    }

    let resultados = [];
    let busqueda = document.getElementById("barraBusqueda").value; // Setea la variable con el valor de la barra de busqueda.

    // Itera la lista de alumnos.
    for (let i = 0; i < alumnos.length; i++) {
        let alumno = alumnos[i];
        // Revisa si el valor de la busqueda se encuentra en el DNI, nombre o apellido de un alumno.
        if (alumno.dni.includes(busqueda) || alumno.apellido.includes(busqueda) || alumno.nombre.includes(busqueda)) {
            resultados.push(alumno); // Si encuentra un alumno con el valor de busqueda, lo añade a resultados.
        }
    }

    leerAlumnos(false, resultados); // Llama la función leerAlumnos() con los valores encontrados.
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function leerCarreras(inicio, listaCarreras) {
    // Revisa si la función se llamó con un argumento para determinar que datos cargar.
    if (listaCarreras) {
        // Si el array del argumento está vacio o es nulo, alerta al usuario y sale de la función.
        if (listaCarreras == null || listaCarreras.length == 0) {
            alert("No se encontraron resultados.");
            return;
        }
        var carreras = listaCarreras;
    } else {
        // Se cargan y parsean los datos almacenados en el Localstorage.
        let jsonData = localStorage.getItem('carreras');
        var carreras = JSON.parse(jsonData);
    }
    let indice = 0;

    // Se obtiene el valor de la tabla en el DOM.
    const bodyCarreras = document.getElementById('bodyCarreras');

    // Limpia las entradas de la tabla ya presentes para evitar que se repitan.
    while (bodyCarreras.childNodes.length > 0) {
        bodyCarreras.removeChild(bodyCarreras.firstChild);
    }

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if ((carreras == null || carreras.length == 0) && !inicio) {
        alert('No hay datos cargados.');
    } else if ((carreras == null || carreras.length == 0) && inicio) { // Esta condicional es para evitar un error en consola.
        return;
    } else {
        // Itera el JSON.
        for (let j of carreras) {

            // Setea las variables con los valores del alumno iterado.
            let nombreCar = j.nombreCar;
            let tipo = j.tipo;
            let duracion = j.duracion;
            let modalidad = j.modalidad;

            // Creación del nodo tr.
            let row = document.createElement('tr');
            row.setAttribute('id', 'tr' + indice);

            // Creación de los nodos td, misma cantidad que la tabla original.
            let cel0 = document.createElement('td');
            let cel1 = document.createElement('td');
            let cel2 = document.createElement('td');
            let cel3 = document.createElement('td');
            let cel4 = document.createElement('td');
            let cel5 = document.createElement('td');

            // Nodos de texto.
            let txt0 = document.createTextNode(indice);
            let txt1 = document.createTextNode(nombreCar);
            let txt2 = document.createTextNode(tipo);
            let txt3 = document.createTextNode(duracion);
            let txt4 = document.createTextNode(modalidad);

            // Creación de los botones "Editar" y "Eliminar".
            let boton = document.createElement('button');
            let action = 'eliminar' + indice;

            let boton2 = document.createElement('button')
            let acto = 'editar' + indice;

            /* 
            Estas funciones permiten que los botones "Editar" y "Eliminar" llamen a las funciones con el índice correcto.
            El método usado para obtener los índices podría ser mejor, posiblemente, pero sirve por ahora.
            */
            boton.setAttribute('id', action);
            boton.addEventListener('click', function () {
                indiceEliminar = boton.id.slice(8) // Obtiene el índice a partir del id del botón.
                eliminarCarrera(indiceEliminar);
            });

            boton2.setAttribute('id', acto);
            boton2.addEventListener('click', function () {
                indiceEditar = boton2.id.slice(6)
                abrirModalCarrera(indiceEditar);
            });

            // Crea los nódos de texto para los botones "Editar" y "Eliminar".
            let txt5 = document.createTextNode('Eliminar');
            let txt6 = document.createTextNode('Editar')

            // Armado de nodos DOM.
            cel0.appendChild(txt0);
            cel1.appendChild(txt1);
            cel2.appendChild(txt2);
            cel3.appendChild(txt3);
            cel4.appendChild(txt4);

            boton.appendChild(txt5);
            boton2.appendChild(txt6);
            cel5.appendChild(boton);
            cel5.appendChild(boton2);

            row.appendChild(cel0);
            row.appendChild(cel1);
            row.appendChild(cel2);
            row.appendChild(cel3);
            row.appendChild(cel4);
            row.appendChild(cel5);

            bodyCarreras.appendChild(row);

            indice++;
        }
    }
}

function guardarCarreras() {
    // Setea variables con los datos del formulario.
    let nombreCar = document.getElementById('nombreCar');
    let tipo = document.getElementById('tipo');
    let duracion = document.getElementById('duracion');
    let modalidad = document.getElementById('modalidad');

    // Verifica si el campo Nombre está vacío
    if (!nombreCar.value || nombreCar.value.trim() == "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Parsea los datos del JSON existente a un objeto JS o crea un array nuevo si no hay datos.
    let carreras = localStorage.getItem('carreras');
    let dataArray = carreras ? JSON.parse(carreras) : [];

    // Crea un JSON con los datos del formulario.
    let dataCarreras = {
        nombreCar: nombreCar.value,
        tipo: tipo.value,
        duracion: duracion.value,
        modalidad: modalidad.value,
    }

    // Ingresa los datos del alumno al array.
    dataArray.push(dataCarreras);

    // Convierte el valor JS del array a un JSON string y lo guarda en el localStorage.
    let jsonData = JSON.stringify(dataArray);
    localStorage.setItem('carreras', jsonData);

    // Limpia los campos del formulario después de guardar los datos
    nombreCar.value = '';
    tipo.value = "diplomatura";
    duracion.value = '3 cuatrimestres';
    modalidad.value = 'virtual';

    // Carga la tabla.
    leerCarreras();
}

function borrarLocalCarreras() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('carreras');
    let carreras = JSON.parse(jsonData);

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if (carreras == null) {
        alert('No hay datos cargados para borrar.');
    } else {
        localStorage.removeItem('carreras'); // Elimina el JSON entero del localstorage.

        // Limpia las entradas de la tabla.
        const bodyCarreras = document.getElementById('bodyCarreras');
        while (bodyCarreras.childNodes.length > 0) {
            bodyCarreras.removeChild(bodyCarreras.firstChild);
        }
    }
}

function editarCarrera(indice) {
    // Setea variables con los campos del modal.
    let nombreCar = document.getElementById('carreraModal');
    let tipo = document.getElementById('tipoModal');
    let duracion = document.getElementById('duracionModal');
    let modalidad = document.getElementById('modalidadModal');


    // Crea un JSON con los datos del formulario.
    let datosCarrera = {
        nombreCar: nombreCar.value,
        tipo: tipo.value,
        duracion: duracion.value,
        modalidad: modalidad.value,
    }

    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('carreras');
    let carreras = JSON.parse(jsonData);

    // Actualiza los datos de la carrera.
    carreras[indice] = datosCarrera;

    // Guarda los datos actualizados en el local.
    localStorage.setItem('carreras', JSON.stringify(carreras));

    // Cierra el modal.
    let modal = document.getElementById('myModalCarreras');
    modal.style.display = 'none';

    // Recarga la tabla.
    leerCarreras();
}

function abrirModalCarrera(indice) {
    // Obtiene el elemento DOM del modal.
    let modal = document.getElementById('myModalCarreras');

    // Obtiene el <span> que cierra el modal.
    let closeBtn = document.getElementsByClassName('close')[0];

    // Hace al modal visible.
    modal.style.display = 'block';

    // Cierra el modal cuando se clickea el botón de cerrar.
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cierra el modal si el usuario clickea afuera del area del modal.
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('carreras');
    let carreras = JSON.parse(jsonData);

    // Obtiene los datos según el índice.
    let carrera = carreras[indice];

    // Setea las variables con los campos del modal.
    let campoNombreCar = document.getElementById('carreraModal');
    let campoTipo = document.getElementById('tipoModal');
    let campoDuracion = document.getElementById('duracionModal');
    let campoModalidad = document.getElementById('modalidadModal');

    // Setea los valores de los campos con los valores de la carrera.
    campoNombreCar.value = carrera.nombreCar;
    campoTipo.value = carrera.tipo;
    campoDuracion.value = carrera.duracion;
    campoModalidad.value = carrera.modalidad;

    // Esta variable almacena una función, y existe para prevenir que el EventListener de botonGuardar se vuelva recursivo.
    let guardarButtonClickHandler = function () {
        editarCarrera(indice);
        botonGuardar.removeEventListener('click', guardarButtonClickHandler); // Elimina el EventListener para evitar la recursión.
    };

    // Obtiene el botón "Guardar datos" y llama a la función editarCarrera() al presionar dicho botón.
    botonGuardar = document.getElementById("guardarLocalModal");
    botonGuardar.addEventListener('click', guardarButtonClickHandler);
}

function eliminarCarrera(indice) {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let datos = localStorage.getItem('carreras');
    let jsonDatos = JSON.parse(datos);

    // Elimina la carrera del array.
    jsonDatos.splice(indice, 1);

    // Guarda los datos actualizados.
    localStorage.setItem('carreras', JSON.stringify(jsonDatos));

    // Elimina la fila correspondiente al alumno de la tabla.
    // Llamar a la función leerCarreras() no es el método más elegante, pero funciona.
    leerCarreras();
}

function buscarCarrera() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('carreras');
    let carreras = JSON.parse(jsonData);

    // Retorna una alerta si el JSON no existe o está vacio y cancela la busqueda.
    if (carreras == null || carreras.length == 0) {
        alert("No se encontraron resultados.");
        return;
    }

    let resultados = [];

    let busqueda = document.getElementById("barraBusqueda").value; // Setea la variable con el valor de la barra de busqueda.

    // Itera la lista de materias.
    for (let i = 0; i < carreras.length; i++) {
        let carrera = carreras[i];
        // Revisa si el valor de la busqueda se encuentra en el nombre, tipo o modalidad de la carrera.
        if (carrera.nombreCar.includes(busqueda) || carrera.tipo.includes(busqueda) || carrera.modalidad.includes(busqueda)) {
            resultados.push(carrera);
        }
    }

    leerCarreras(false, resultados);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function leerMaterias(inicio, listaMaterias) {
    // Revisa si la función se llamó con un argumento para determinar que datos cargar.
    if (listaMaterias) {
        // Si el array del argumento está vacio o es nulo, alerta al usuario y sale de la función.
        if (listaMaterias == null || listaMaterias.length == 0) {
            alert("No se encontraron resultados.");
            return;
        }
        var materias = listaMaterias; // Setea la variable alumnos con el valor argumentado.
    } else {
        // Se cargan y parsean los datos almacenados en el Localstorage.
        let jsonData = localStorage.getItem('materias');
        var materias = JSON.parse(jsonData);
    }
    let indice = 0;

    // Se obtiene el valor de la tabla en el DOM.
    const bodyMaterias = document.getElementById('bodyMaterias');

    // Limpia las entradas de la tabla ya presentes para evitar que se repitan.
    while (bodyMaterias.childNodes.length > 0) {
        bodyMaterias.removeChild(bodyMaterias.firstChild);
    }

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if ((materias == null || materias.length == 0) && !inicio) {
        alert('No hay datos cargados.');
    }
    else if ((materias == null || materias.length == 0) && inicio) { // Esta condicional es para evitar un error en consola.
        return;
    }
    else {
        // Itera el JSON.
        for (let j of materias) {

            // Setea las variables con los valores del alumno iterado.
            let nombreMat = j.nombreMat;
            let modalMat = j.modalMat;
            let horaSema = j.horaSema;
            let carrera = j.carrera;

            // Creación del nodo tr.
            let row = document.createElement('tr');
            row.setAttribute('id', 'tr' + indice);

            // Creación de los nodos td, misma cantidad que la tabla original.
            let cel0 = document.createElement('td');
            let cel1 = document.createElement('td');
            let cel2 = document.createElement('td');
            let cel3 = document.createElement('td');
            let cel4 = document.createElement('td');
            let cel5 = document.createElement('td');

            // Nodos de texto.
            let txt0 = document.createTextNode(indice);
            let txt1 = document.createTextNode(nombreMat);
            let txt2 = document.createTextNode(modalMat);
            let txt3 = document.createTextNode(horaSema);
            let txt4 = document.createTextNode(carrera);

            // Creación de los botones "Editar" y "Eliminar".
            let boton = document.createElement('button');
            let action = 'eliminar' + indice;

            let boton2 = document.createElement('button')
            let acto = 'editar' + indice;

            /* 
            Estas funciones permiten que los botones "Editar" y "Eliminar" llamen a las funciones con el índice correcto.
            El método usado para obtener los índices podría ser mejor, posiblemente, pero sirve por ahora.
            */
            boton.setAttribute('id', action);
            boton.addEventListener('click', function () {
                indiceEliminar = boton.id.slice(8) // Obtiene el índice a partir del id del botón.
                eliminarMateria(indiceEliminar);
            });

            boton2.setAttribute('id', acto);
            boton2.addEventListener('click', function () {
                indiceEditar = boton2.id.slice(6)
                abrirModalMaterias(indiceEditar);
            });

            // Crea los nódos de texto para los botones "Editar" y "Eliminar".
            let txt5 = document.createTextNode('Eliminar');
            let txt6 = document.createTextNode('Editar')

            // Armado de nodos DOM.
            cel0.appendChild(txt0);
            cel1.appendChild(txt1);
            cel2.appendChild(txt2);
            cel3.appendChild(txt3);
            cel4.appendChild(txt4);

            boton.appendChild(txt5);
            boton2.appendChild(txt6);
            cel5.appendChild(boton);
            cel5.appendChild(boton2);

            row.appendChild(cel0);
            row.appendChild(cel1);
            row.appendChild(cel2);
            row.appendChild(cel3);
            row.appendChild(cel4);
            row.appendChild(cel5);

            bodyMaterias.appendChild(row);

            indice++;
        }
    }
}

function guardarMaterias() {
    // Setea variables con los datos del formulario.
    let nombreMat = document.getElementById('nombreMat');
    let modalMat = document.getElementById('modalMat');
    let horaSema = document.getElementById('horaSema');
    let carrera = document.getElementById('carrera');

    // Verifica si algún campo está vacío
    if (
        (!nombreMat.value || nombreMat.value.trim() == "") ||
        (!modalMat.value || modalMat.value.trim() == "") ||
        (!horaSema.value || horaSema.value.trim() == "") ||
        (!carrera.value || carrera.value.trim() == "")
    ) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Parsea los datos del JSON existente a un objeto JS o crea un array nuevo si no hay datos.
    let materias = localStorage.getItem('materias');
    let dataArray = materias ? JSON.parse(materias) : [];

    // Crea un JSON con los datos del formulario.
    let materiaData = {
        nombreMat: nombreMat.value,
        modalMat: modalMat.value,
        horaSema: horaSema.value,
        carrera: carrera.value,
    }

    // Ingresa los datos del alumno al array.
    dataArray.push(materiaData);

    // Convierte el valor JS del array a un JSON string y lo guarda en el localStorage.
    let jsonData = JSON.stringify(dataArray);
    localStorage.setItem('materias', jsonData);

    // Limpia los campos del formulario después de guardar los datos
    nombreMat.value = '';
    modalMat.value = 'Presencial';
    horaSema.value = '1';
    carrera.value = '';

    // Carga la tabla.
    leerMaterias();
}

function borrarLocalMaterias() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('materias');
    let materias = JSON.parse(jsonData);

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if (materias == null) {
        alert('No hay datos cargados para borrar.');
    } else {
        localStorage.removeItem('materias'); // Elimina el JSON entero del localstorage.

        // Limpia las entradas de la tabla.
        const bodyMaterias = document.getElementById('bodyMaterias');
        while (bodyMaterias.childNodes.length > 0) {
            bodyMaterias.removeChild(bodyMaterias.firstChild);
        }
    }
}

function editarMateria(indice) {
    // Setea variables con los campos del modal.
    let nombreMat = document.getElementById('materiaModal');
    let modalMat = document.getElementById('modalMatModal');
    let horaSema = document.getElementById('horaSemaModal');
    let carrera = document.getElementById('carreraModal');

    // Crea un JSON con los datos del formulario.
    let datosMateria = {
        nombreMat: nombreMat.value,
        modalMat: modalMat.value,
        horaSema: horaSema.value,
        carrera: carrera.value,
    }

    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('materias');
    let materias = JSON.parse(jsonData);

    // Actualiza los datos de la materia.
    materias[indice] = datosMateria;

    // Guarda los datos actualizados en el local.
    localStorage.setItem('materias', JSON.stringify(materias));

    // Cierra el modal.
    let modal = document.getElementById('myModalMaterias');
    modal.style.display = 'none';

    // Recarga la tabla.
    leerMaterias();
}

function abrirModalMaterias(indice) {
    // Obtiene el elemento DOM del modal.
    let modal = document.getElementById('myModalMaterias');

    // Obtiene el <span> que cierra el modal.
    let closeBtn = document.getElementsByClassName('close')[0];

    // Hace al modal visible.
    modal.style.display = 'block';

    // Cierra el modal cuando se clickea el botón de cerrar.
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cierra el modal si el usuario clickea afuera del area del modal.
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('materias');
    let materias = JSON.parse(jsonData);

    // Obtiene los datos según el índice.
    let materia = materias[indice];

    // Setea las variables con los campos del modal.
    let campoNombreMat = document.getElementById('materiaModal');
    let campoModalMat = document.getElementById('modalMatModal');
    let campoHoraSema = document.getElementById('horaSemaModal');
    let campoCarrera = document.getElementById('carreraModal');

    // Setea los valores de los campos con los valores de la materia.
    campoNombreMat.value = materia.nombreMat;
    campoModalMat.value = materia.modalMat;
    campoHoraSema.value = materia.horaSema;
    campoCarrera.value = materia.carrera;

    // Esta variable almacena una función, y existe para prevenir que el EventListener de botonGuardar se vuelva recursivo.
    let guardarButtonClickHandler = function () {
        editarMateria(indice);
        botonGuardar.removeEventListener('click', guardarButtonClickHandler); // Elimina el EventListener para evitar la recursión.
    };

    // Obtiene el botón "Guardar datos" y llama a la función editarMateria() al presionar dicho botón.
    botonGuardar = document.getElementById("guardarLocalModal");
    botonGuardar.addEventListener('click', guardarButtonClickHandler);
}

function eliminarMateria(indice) {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let datos = localStorage.getItem('materias');
    let jsonDatos = JSON.parse(datos);

    // Elimina la carrera del array.
    jsonDatos.splice(indice, 1);

    // Guarda los datos actualizados.
    localStorage.setItem('materias', JSON.stringify(jsonDatos));

    // Elimina la fila correspondiente al alumno de la tabla.
    // Llamar a la función leerMaterias() no es el método más elegante, pero funciona.
    leerMaterias();
}

function buscarMateria() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('materias');
    let materias = JSON.parse(jsonData);

    // Retorna una alerta si el JSON no existe o está vacio y cancela la busqueda.
    if (materias == null || materias.length == 0) {
        alert("No se encontraron resultados.");
        return;
    }

    let resultados = [];

    let busqueda = document.getElementById("busquedaMateria").value; // Setea la variable con el valor de la barra de busqueda.

    // Itera la lista de materias.
    for (let i = 0; i < materias.length; i++) {
        let materia = materias[i];

        if (materia.nombreMat.includes(busqueda) || materia.carrera.includes(busqueda)) {
            resultados.push(materia);
        }
    }

    leerMaterias(false, resultados);
}

function cargarCarrerasEnMaterias() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('carreras');
    let carreras = JSON.parse(jsonData);

    // Muestra un aviso y sale de la función si no hay carreras en el localstorage.
    if (!carreras || carreras.length == 0) {
        alert("AVISO: No se pueden registrar materias si no existen carreras guardadas.")
        return;
    }

    // Setea dos variables con los elementos de carrera.
    let dropdown = document.getElementById("carrera");
    let dropdownModal = document.getElementById("carreraModal");

    // Itera las carreras y añade las opciones a los dropdowns de la página y del modal.
    for (let carrera of carreras) {
        const opcion = document.createElement("option");
        const opcionModal = document.createElement("option");
        opcion.value = carrera.nombreCar;
        opcion.textContent = carrera.nombreCar;
        opcionModal.value = carrera.nombreCar;
        opcionModal.textContent = carrera.nombreCar;
        dropdown.appendChild(opcion);
        dropdownModal.appendChild(opcionModal);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function leerInscripciones(inicio, listaInscripciones) {
    // Revisa si la función se llamó con un argumento para determinar que datos cargar.
    if (listaInscripciones) {
        // Si el array del argumento está vacio o es nulo, alerta al usuario y sale de la función.
        if (listaInscripciones == null || listaInscripciones.length == 0) {
            alert("No se encontraron resultados.");
            return;
        }
        var inscripciones = listaInscripciones;
    } else {
        // Se cargan y parsean los datos almacenados en el Localstorage.
        let jsonData = localStorage.getItem('inscripciones');
        var inscripciones = JSON.parse(jsonData);
    }
    let indice = 0;

    // Se obtiene el valor de la tabla en el DOM.
    const bodyInscripciones = document.getElementById('bodyInscripciones');

    // Limpia las entradas de la tabla ya presentes para evitar que se repitan.
    while (bodyInscripciones.childNodes.length > 0) {
        bodyInscripciones.removeChild(bodyInscripciones.firstChild);
    }

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if ((inscripciones == null || inscripciones.length == 0) && !inicio) {
        alert('No hay datos cargados.');
    } else if ((inscripciones == null || inscripciones.length == 0) && inicio) { // Esta condicional es para evitar un error en consola.
        return;
    } else {
        // Itera el JSON.
        for (let j of inscripciones) {

            // Setea las variables con los valores del alumno iterado.
            let alumno = j.alumno;
            let carrera = j.carrera;
            let materia = j.materia;

            // Creación del nodo tr.
            let row = document.createElement('tr');
            row.setAttribute('id', 'tr' + indice);

            // Creación de los nodos td, misma cantidad que la tabla original.
            let cel0 = document.createElement('td');
            let cel1 = document.createElement('td');
            let cel2 = document.createElement('td');
            let cel3 = document.createElement('td');
            let cel4 = document.createElement('td');

            // Nodos de texto.
            let txt0 = document.createTextNode(indice);
            let txt1 = document.createTextNode(alumno);
            let txt2 = document.createTextNode(carrera);
            let txt3 = document.createTextNode(materia);

            // Creación de los botones "Editar" y "Eliminar".
            let boton = document.createElement('button');
            let action = 'eliminar' + indice;

            /* 
            Estas funcion permite que el boton "Eliminar" llame a la funcion con el índice correcto.
            El método usado para obtener el índice podría ser mejor, posiblemente, pero sirve por ahora.
            */
            boton.setAttribute('id', action);
            boton.addEventListener('click', function () {
                indiceEliminar = boton.id.slice(8) // Obtiene el índice a partir del id del botón.
                eliminarInscripcion(indiceEliminar);
            });

            // Crea el nódo de texto para el boton "Eliminar".
            let txt5 = document.createTextNode('Eliminar');

            // Armado de nodos DOM.
            cel0.appendChild(txt0);
            cel1.appendChild(txt1);
            cel2.appendChild(txt2);
            cel3.appendChild(txt3);

            boton.appendChild(txt5);
            cel4.appendChild(boton);

            row.appendChild(cel0);
            row.appendChild(cel1);
            row.appendChild(cel2);
            row.appendChild(cel3);
            row.appendChild(cel4);

            bodyInscripciones.appendChild(row);

            indice++;
        }
    }
}

function guardarInscripciones() {
    // Obtén los valores de los campos del formulario
    let alumno = document.getElementById('dniAlu');
    let carrera = document.getElementById('nomCarrera');
    let materia = document.getElementById('nomMateria');

    // Verifica si algún campo está vacío
    if (
        !alumno.value ||
        !carrera.value ||
        !materia.value
    ) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Parsea los datos del JSON existente a un objeto JS o crea un array nuevo si no hay datos
    let inscripciones = localStorage.getItem('inscripciones');
    let dataArray = inscripciones ? JSON.parse(inscripciones) : [];

    // Crea un objeto con los datos del formulario
    let inscripcionesDatos = {
        alumno: alumno.value,
        carrera: carrera.value,
        materia: materia.value,
    };

    // Ingresa los datos de la inscripción al array
    dataArray.push(inscripcionesDatos);

    // Convierte el valor JS del array a un JSON string y lo guarda en el localStorage
    let jsonData = JSON.stringify(dataArray);
    localStorage.setItem('inscripciones', jsonData);

    // Limpia los campos del formulario después de guardar los datos
    alumno.value = '';
    carrera.value = '';
    materia.value = '';

    // Limpia el dropdown de materias.
    cargarMateriasAsociadasACarrera();

    // Carga la tabla.
    leerInscripciones();
}

function borrarLocalInscripciones() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('inscripciones');
    let inscripciones = JSON.parse(jsonData);

    // Alerta al usuario que no hay datos cargados si el JSON está vacio o es nulo.
    if (inscripciones == null) {
        alert('No hay datos cargados para borrar.');
    } else {
        localStorage.removeItem('inscripciones'); // Elimina el JSON entero del localstorage.

        // Limpia las entradas de la tabla.
        const bodyInscripciones = document.getElementById('bodyInscripciones');
        while (bodyInscripciones.childNodes.length > 0) {
            bodyInscripciones.removeChild(bodyInscripciones.firstChild);
        }
    }
}

function eliminarInscripcion(indice) {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let datos = localStorage.getItem('inscripciones');
    let jsonDatos = JSON.parse(datos);

    // Elimina la carrera del array.
    jsonDatos.splice(indice, 1);

    // Guarda los datos actualizados.
    localStorage.setItem('inscripciones', JSON.stringify(jsonDatos));

    // Elimina la fila correspondiente al alumno de la tabla.
    // Llamar a la función leerInscripciones() no es el método más elegante, pero funciona.
    leerInscripciones();
}

function buscarInscripcion() {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('inscripciones');
    let inscripciones = JSON.parse(jsonData);

    // Retorna una alerta si el JSON no existe o está vacio y cancela la busqueda.
    if (inscripciones == null || inscripciones.length == 0) {
        alert("No se encontraron resultados.");
        return;
    }

    let resultados = [];

    let busqueda = document.getElementById("busquedaInscripcion").value; // Setea la variable con el valor de la barra de busqueda.

    // Itera la lista de inscripciones.
    for (let i = 0; i < inscripciones.length; i++) {
        let inscripcion = inscripciones[i];

        if (inscripcion.alumno.includes(busqueda) || inscripcion.carrera.includes(busqueda) || inscripcion.materia.includes(busqueda)) {
            resultados.push(inscripcion);
        }
    }

    leerInscripciones(false, resultados);
}

function cargarDatosInscripciones() {
    // Se cargan y parsean los datos almacenados en el Localstorage para alumnos, carreras y materias.
    let jsonData = localStorage.getItem('alumnos');
    let alumnos = JSON.parse(jsonData);

    jsonData = localStorage.getItem('carreras');
    let carreras = JSON.parse(jsonData);

    jsonData = localStorage.getItem('materias');
    let materias = JSON.parse(jsonData);

    // Muestra un aviso y sale de la función si no hay alumnos, carreras o materias en el localstorage.
    if (!alumnos || alumnos.length == 0) {
        alert("AVISO: No se pueden inscribir alumnos si no existen alumnos guardados.")
        return;
    }

    if (!carreras || carreras.length == 0) {
        alert("AVISO: No se pueden inscribir alumnos si no existen carreras guardadas.")
        return;
    }

    if (!materias || materias.length == 0) {
        alert("AVISO: No se pueden inscribir alumnos si no existen materias guardadas.")
        return;
    }

    // Setea dos variables con los dropdowns de Alumno y Carrera.
    let dropdownAlumno = document.getElementById("dniAlu");
    let dropdownCarrera = document.getElementById("nomCarrera");

    // Itera los alumnos y carreras, y añade las opciones a los dropdowns de la página.
    for (let alumno of alumnos) {
        const opcion = document.createElement("option");
        opcion.value = alumno.dni;
        opcion.textContent = alumno.dni;
        dropdownAlumno.appendChild(opcion);
    }

    for (let carrera of carreras) {
        const opcion = document.createElement("option");
        opcion.value = carrera.nombreCar;
        opcion.textContent = carrera.nombreCar;
        dropdownCarrera.appendChild(opcion);
    }

    // Llama a la función para cargar las materias asociadas a la carrera que aparece por defecto.
    cargarMateriasAsociadasACarrera(dropdownCarrera.value);

    // Muestra las materias asociadas con cualquier carrera que el usuario elija.
    dropdownCarrera.addEventListener('change', function () {
        cargarMateriasAsociadasACarrera(dropdownCarrera.value);
    });
}

function cargarMateriasAsociadasACarrera(carrera) {
    // Se cargan y parsean los datos almacenados en el Localstorage.
    let jsonData = localStorage.getItem('materias');
    let materias = JSON.parse(jsonData);

    // Setea una variable con el elemento de materia.
    let dropdown = document.getElementById("nomMateria");
    dropdown.innerHTML = ''; // Limpia el dropdown.

    // Itera las materias y añade las opciones al dropdown de la página.
    for (let materia of materias) {
        if (materia.carrera == carrera) {
            const opcion = document.createElement("option");
            opcion.value = materia.nombreMat;
            opcion.textContent = materia.nombreMat;
            dropdown.appendChild(opcion);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

function obtenerNoticias() {
    // Asigna la URL del API a una variable.
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=2e9931f26ecd4c618015a7bdeb130fe9';

    // Hace el request a la API con la URL guardada en la variable.
    var req = new Request(url);

    // Obtiene los datos del request y los parsea a un JSON.
    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let articulos = data.articles // Obtiene los artículos en el JSON.

            var noticiasContainer = document.getElementById('noticiasContainer'); // Obtiene el container de noticias.

            // Itera artículo por artículo.
            articulos.forEach(function (article) {
                // Crea un elemento div para cada artículo y le asigna la clase "noticia".
                var articuloDiv = document.createElement('div');
                articuloDiv.classList.add("noticia");

                // Setea el contenido del div con el título (con el autor cortado), autor y link a la noticia.
                articuloDiv.innerHTML = `
                    <h2>${article.title.substring(0, article.title.indexOf(" - "))}</h2>
                    <p>Fuente: <b><u>${article.author}</u></b></p>
                    <a href="${article.url}" target="_blank" class="linkText">Leer más.</a>
                `;

                // Añade el artículo al div.
                noticiasContainer.appendChild(articuloDiv);
            });
        })
        .catch(function (error) {
            console.error('Error:', error);
        });

    //2e9931f26ecd4c618015a7bdeb130fe9 API KEY

}
