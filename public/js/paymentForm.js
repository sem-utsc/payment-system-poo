// seleccionar el input del email y agregar un listener para el evento onchange
document.getElementById('email').addEventListener('keyup', function() {
    // obtener el valor del email
    const email = this.value;
    console.log('Email ingresado:', email);
    // validar el email
    // if (!validateEmail(email)) {
    //     alert('Por favor ingrese un email válido');
    // }
});

// // función para validar el formato del email
// function validateEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
// }
