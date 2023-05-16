function sendData(srch) {
  const searchResults = document.getElementById('searchResults')
  let query = srch.value;
  if (query.length = 0) {
    searchResults.style.visibility = "hidden";
  }

  if (query.length > 0) {
    searchResults.style.visibility = "visible";
    const url = `http://localhost:3004/search?q=${query}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = '';
        if (srch.length < 1) {
          searchResults.innerHTML = '<p>No hemos encontrado lo que buscas</p>';
        }
        data.forEach((item, index) => {
          if (index > 0) searchResults.innerHTML += '<hr>';
          searchResults.innerHTML += `<a href="http://localhost:3000/event/${item._id}"><p>${item.titulo}</p></a>`
        });
      })
  }

  document.addEventListener('click', function (event) {
    if (event.target !== srch && event.target !== searchResults) {
      searchResults.style.visibility = "hidden";
    }
  });

}


function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const formattedDate = `${year}-${day}-${month} ${hours}:${minutes}:00`;
  return formattedDate;
}

function submitForm(id) {
  const form = document.getElementById('putForm');
  const formData = new FormData(form);

  if (!formData.get('categoria')) {
    alert('Debe seleccionar una categoria');
  }

  let fecha = "";
  if (formData.get('fechahora').length > 1) {
    fecha = formatDate(formData.get('fechahora'))
  }

  const data = {
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
    categoria: formData.get('categoria'),
    foto: formData.get('foto'),
    fechahora: fecha,
    duracion: formData.get('duracion'),
    precio: formData.get('precio'),
    correoContacto: formData.get('correoContacto'),
    telefonoContacto: formData.get('telefonoContacto'),
    creado_por: formData.get('creado_por'),
    coords: formData.get('coords'),
    id_widget: formData.get('id_widget'),
    clasificacion: formData.get('clasificacion'),
    numvisitas: formData.get('numvisitas')
  };



  fetch(`http://localhost:3004/api/actividad/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        alert('Actividad actualizada con exito!');
        window.location.reload()
      } else {
        throw new Error('Error al actualizar actividad');
      }

      let fecha = "";
      if (formData.get('fechahora').length > 1) {
        fecha = formatDate(formData.get('fechahora'))
      }

      const data = {
        titulo: formData.get('titulo'),
        descripcion: formData.get('descripcion'),
        categoria: formData.get('categoria'),
        foto: formData.get('foto'),
        fechahora: fecha,
        duracion: formData.get('duracion'),
        precio: formData.get('precio'),
        correoContacto: formData.get('correoContacto'),
        telefonoContacto: formData.get('telefonoContacto'),
        creado_por: formData.get('creado_por'),
        coords: formData.get('coords'),
        id_widget: formData.get('id_widget'),
        clasificacion: formData.get('clasificacion'),
      };



      fetch(`http://localhost:3004/api/actividad/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (response.ok) {
            alert('Actividad actualizada con exito!');
            window.location.reload()
          } else {
            throw new Error('Error al actualizar actividad');
          }
        })
        .catch(error => {
          console.error(error);
          alert('Error al actualizar actividad');
        });
    })
}


function submitForm2(id) {
  const form = document.getElementById('putForm2');
  const formData = new FormData(form);

  const data = {
    nombre: formData.get('nombre'),
    apellido: formData.get('apellido'),
    nombreUsuario: formData.get('nombreUsuario'),
    email: formData.get('email'),
    password: formData.get('password'),
    dni: formData.get('dni'),
    fecha_nacimiento: formData.get('fecha_nacimiento'),
    rol: formData.get('rol'),
    foto_perfil: formData.get('foto_perfil'),
  };

  fetch(`http://localhost:3004/api/usuario/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        alert('Usuario actualizado con exito!');
        window.location.reload()
      } else {
        throw new Error('Error al actualizar el usuario');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error al actualizar usuario');
    });
}



function eliminarActividad(id) {

  fetch(`http://localhost:3004/api/actividad/${id}`,
    {
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        window.location.href = "http://localhost:3000"
      } else {
        console.log("Error!")
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
}


function eliminarActAdmin(id) {

  fetch(`http://localhost:3004/api/actividad/${id}`,
    {
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload();
      } else {
        console.log("Error!")
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
}

function eliminarCla(id) {

  fetch(`http://localhost:3004/api/clasificacion/${id}`,
    {
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload()
      } else {
        console.log("Error!")
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
}

function eliminarUsu(id) {

  fetch(`http://localhost:3004/api/usuario/${id}`,
    {
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload()
      } else {
        console.log("Error!")
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
}

function eliminarCat(id) {

  fetch(`http://localhost:3004/api/categoria/${id}`,
    {
      method: "DELETE"
    })
    .then((res) => {
      if (res.ok) {
        window.location.reload()
      } else {
        console.log("Error!")
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    })
}


///////// crear actividad
function crearEvento() {
  const form = document.getElementById('eventForm');
  const formData = new FormData(form);

  let fecha = "";
  if (formData.get('fechahora').length > 1) {
    fecha = formatDate(formData.get('fechahora'))
  }


  const data = {
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
    id_categoria: formData.get('id_categoria'),
    foto: formData.get('foto'),
    fechahora: fecha,
    precio: formData.get('precio'),
    correoContacto: formData.get('correoContacto'),
    telefonoContacto: formData.get('telefonoContacto'),
    creado_por: formData.get('creado_por'),
    coords: formData.get('coords'),
    id_clasificacion: formData.get('id_clasificacion'),
    numvisitas: 0,
  };



  fetch(`http://localhost:3004/api/actividad/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        alert('Actividad creada con exito!');
        window.location.reload()
      } else {
        throw new Error('Error al crear actividad');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error al crear actividad');
    });
}

///////// crear categoria
function crearCategoria() {
  const form = document.getElementById('catForm');
  const formData = new FormData(form);

  const data = {
    titulo: formData.get('titulo'),
    descripcion: formData.get('descripcion'),
  };



  fetch(`http://localhost:3004/api/categoria/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        alert('Categoria creada con exito!');
        window.location.reload()
      } else {
        throw new Error('Error al crear categoria');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error al crear categoria');
    });
}

///////// crear clasificacion
function crearClasificacion() {
  const form = document.getElementById('claForm');
  const formData = new FormData(form);

  const data = {
    identificador: formData.get('identificador'),
    descripcion: formData.get('descripcion'),
  };



  fetch(`http://localhost:3004/api/clasificacion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        alert('Clasificacion creada con exito!');
        window.location.reload()
      } else {
        throw new Error('Error al crear clasificacion');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error al crear clasificacion');
    });
}


/// checkout

const stripe = Stripe('pk_live_51N6wogIpj2kPszHnq9TRNpFkrO0cojAcnqWCmoR9FaeFelom4jmluUGZXo2FcfkRTYhsHJZH2aT6hAFqhV3J7P6J00lKO15jtb');

const button = document.getElementById('checkout-button');

const form = document.getElementById('checkForm');
  const formData = new FormData(form);

button.addEventListener('click', async () => {
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: 'price_1N8KhrIpj2kPszHninLSc4Rw', quantity: 1 }],
    mode: 'payment',
    successUrl: 'http://localhost:3000/success',
    cancelUrl: 'http://localhost:3000/cancel',
  });

  if (error) {
    console.error(error);
  }
});

