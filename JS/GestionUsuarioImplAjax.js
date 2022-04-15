function enviarUsuario(){
    let nom=document.getElementById("firstName").value;
    let ape=document.getElementById("lastName").value;
    let ema=document.getElementById("emailA").value;
    let fec=document.getElementById("fech");
    let pas=document.getElementById("passA").value;
    let titulo=document.getElementById("titulo");
    let regemail=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let regnomApe=/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;
    let regpass=/^(?=.*\d).{4,8}$/;
    if(calcularEdad(fec.value)<=18) titulo.innerHTML="tienes que ser mayor de 18años";
    else if(!regnomApe.test(nom)) titulo.innerHTML="Vuelve a introducir tu nombre";
    else if(!regnomApe.test(ape)) titulo.innerHTML="Vuelve a introducir un apellido";
    else if(!regemail.test(ema)) titulo.innerHTML="formato de email incorrecto o email ya existente";
    else if(!regpass.test(pas)) titulo.innerHTML="La contraseña tiene que tener entre 4 y 8 Caracteres y al menos un numero";
    else{
        let usuario={
            email: ema,
            apellidos: ape,
            nacimiento: fec.value,
            nombre: nom,
            password: pas
        }
        registraUsuario(usuario);
    }
}


function calcularEdad(fecha_nacimiento) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

function registraUsuario(usuario){
    let titulo=document.getElementById("titulo");
    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:4000/usuario/alta", true);
    request.setRequestHeader("content-type", 'application/json');
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200) {
            let response = this.response;
            titulo.innerHTML=`<a href="Login.html" class="btn mt-4"">Inicio Exitoso, Volver a Inicio Sesion</a>`;
        }
    }
    request.send(JSON.stringify(usuario));
}
function login(){
    let email=document.getElementById("email").value;
    let pass=document.getElementById("pass").value;
    getUsu(email,pass);
}
function getUsu(email,pass){
    let request=new XMLHttpRequest();
    let titulo=document.getElementById("tituloLog");
    request.open("GET",`http://localhost:4000/usuario/${email}`);
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status){
            let response=JSON.parse(this.response);
            titulo.innerHTML=`<a href="index.html" class="btn mt-4"">Inicio Exitoso, Volver a Inicio</a>`;
            if(pass===response.password) {
                localStorage.setItem("user", JSON.stringify(response));
            }
            else {
                titulo.innerHTML="Contraseña incorrecta";
            }
        }
    }
    request.send();
}
function cerrarSession(){
    let x=JSON.parse(localStorage.getItem("user"));
    if(x!=null){
        localStorage.removeItem("user");
        onload.preventDefault();
    }
}
