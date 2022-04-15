var usuario=JSON.parse(localStorage.getItem("user"));
function mostrarUsuario(){
    let use=JSON.parse(localStorage.getItem("user"));
    let row=document.getElementById("ROW");
    let col=document.createElement("div");
    col.id="COL";
    col.className="col";
    col.style.padding="30px";
    col.style.alignContent="center";
    col.innerHTML=`
        <div><p style="font-size: 20px;">Nombre: ${use.nombre}</p></div>
        <div><p style="font-size: 20px;">Apellido: ${use.apellidos}</p></div>
        <div><p style="font-size: 20px;">Email: ${use.email}</p></div>
        <div><p style="font-size: 20px;">Fecha de Nacimiento: ${use.nacimiento}</p></div>
        <div>
            <button class="btno" style="border: 1px solid; border-radius: 5px;" onclick="mostrarCambiarDatos()">CambiarDatos</button>
            <button class="btno" style="border: 1px solid; border-radius: 5px;" onclick="formTrajeta()">Tarjetas</button>
        </div>
    </div>`
    row.appendChild(col);
}
function mostrarCambiarDatos(){
    let delDiv=document.getElementById("COL");
    delDiv.remove();
    let row=document.getElementById("ROW");
    let col=document.createElement("div");
    col.id="COL";
    col.className="col";
    col.style.padding="30px";
    col.style.alignContent="center";
    let inputss=`<h1 id="tilt"></h1>
                    <div class="form-group">
                        <input type="text" class="form-style" placeholder="Introduce tu nuevo nombre" id="firstName" autocomplete="off"
                        onfocus="actualizarUsu()">
                        <i class="input-icon uil uil-user"></i>
                   </div>
                    <div class="form-group mt-2">
                         <input type="text" class="form-style" placeholder="Introduce tu nuevo apellido" id="lastName" autocomplete="off"
                         onfocus="actualizarApellido()">
                         <i class="input-icon uil uil-user"></i>
                   </div>
                    <div class="form-group mt-2">
                         <input type="password" class="form-style" placeholder="Introduce tu antigua contraseña" id="firstPass" autocomplete="off"
                         onfocus="actualizarContrasena()">
                         <i class="input-icon uil uil-user"></i>
                   </div>
                    <div class="form-group mt-2">
                         <input type="password" class="form-style" placeholder="Introduce tu nueva contraseña" id="newPass" autocomplete="off">
                         <i class="input-icon uil uil-user"></i>
                   </div>
                   <div id="btn">
                   </div>
                    <div><button class="btno" style="border: 1px solid; border-radius: 5px;" onfocus="brraDiv()">Volver</button></div>`
    col.innerHTML=inputss;
    row.appendChild(col);
}
function brraDiv(){
    let delDiv=document.getElementById("COL");
    delDiv.remove();
    mostrarUsuario()
}
function actualizarUsu(){
    let div=document.getElementById("btn");
    let button=`<button class="btno" style="border: 1px solid; border-radius: 5px;" onclick="cambiarUsuario()">Cambiar Nombre</button>`;
    div.innerHTML=button;
}
function actualizarApellido(){
    let div=document.getElementById("btn");
    let button=`<button class="btno" style="border: 1px solid; border-radius: 5px;" onclick="cambiarApe()">Cambiar Apellido</button>`;
    div.innerHTML=button
}
function actualizarContrasena(){
    let div=document.getElementById("btn");
    let button=`<button class="btno" style="border: 1px solid; border-radius: 5px;" onclick="cambiarPass()">Cambiar Contraseña</button>`;
    div.innerHTML=button
}
function cambiarUsuario(){
    let usu=document.getElementById("firstName").value;
    let tilt=document.getElementById("tilt");
    if(/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/.test(usu)){
        usuario.nombre=usu;
        registraUsuario(usuario);
    }
    else{
        tilt.innerHTML="Formato incorrecto";
    }
}
function cambiarApe(){
    let ape=document.getElementById("lastName").value;
    let tilt=document.getElementById("tilt");
    if(/^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/.test(ape)){
        usuario.apellidos=ape;
        registraUsuario(usuario);
    }
    else{
        tilt.innerHTML="Formato incorrecto";
    }
}
function cambiarPass(){
    let oldPass=document.getElementById("firstPass").value;
    let newPass=document.getElementById("newPass").value;
    let tilt=document.getElementById("tilt");
    if(!/^(?=.*\d).{4,8}$/.test(newPass)){
        tilt.innerHTML="La contraseña tiene que tener entre 4 y 8 Caracteres y al menos un numero";
    }
    else if(oldPass===newPass||oldPass!==usuario.password){
        tilt.innerHTML="La contraseña introducida es la misma";
    }
    else {
        usuario.password=newPass;
        registraUsuario(usuario);
    }
}
function registraUsuario(usuario){
    let request=new XMLHttpRequest();
    request.open("PUT","http://localhost:4000/usuario/modificar", true);
    request.setRequestHeader("content-type", 'application/json');
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200) {
            let response = this.response;

        }
    }
    localStorage.setItem("user",JSON.stringify(usuario));
    request.send(JSON.stringify(usuario));
}
function formTrajeta(){
    let delDiv=document.getElementById("COL");
    delDiv.remove();
    let row=document.getElementById("ROW");
    let col=document.createElement("div");
    col.id="COL";
    col.className="col";
    col.style.padding="30px";
    col.style.alignContent="center";
    let inputss=`<h1 id="tilt"></h1>
                    <div class="form-group">
                        <input type="number" class="form-style" placeholder="Numero Tarjeta" id="nTarjeta" autocomplete="off">
                        <i class="input-icon uil uil-user"></i>
                   </div>
                    <div class="form-group mt-2">
                         <input type="date" class="form-style" placeholder="Caducidad" id="nCaducidad" autocomplete="off"
                         >
                         <i class="input-icon uil uil-user"></i>
                   </div>
                    <div class="form-group mt-2">
                         <input type="text" class="form-style" placeholder="Titular" id="nomTitular" autocomplete="off"
                         >
                         <i class="input-icon uil uil-user"></i>
                   </div>
                    <div class="form-group mt-2">
                         <input type="number" class="form-style" placeholder="CCV" id="ccv" autocomplete="off">
                         <i class="input-icon uil uil-user"></i>
                   </div>
                   <div id="btn">
                   </div>
                    <div><button class="btno" style="border: 1px solid; border-radius: 5px;" onfocus="crearTarjeta()">Añadir Tarjeta</button></div>
                    <div><button class="btno" style="border: 1px solid; border-radius: 5px;" onfocus="brraDiv()">Volver</button></div>`
    col.innerHTML=inputss;
    row.appendChild(col);
}
function crearTarjeta(){
    let usu=JSON.parse(localStorage.getItem("user"));
    let nTarjeta=document.getElementById("nTarjeta").value;
    let nCaducidad=document.getElementById("nCaducidad").value;
    let nomTiular=document.getElementById("nomTitular").value;
    let ccv=document.getElementById("ccv").value;
    let tarjeta={
        numero: nTarjeta,
        caducidad: nCaducidad,
        titular: nomTiular,
        cvv: ccv
    }
    ajaxTarjeta(tarjeta,usu.email);
}
function ajaxTarjeta(tarjeta, email){
    let request=new XMLHttpRequest();
    request.open("POST",`http://localhost:4000/tarjeta/alta/${email}`, true);
    request.setRequestHeader("content-type", 'application/json');
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200) {
            let response = this.response;
        }
    }
    request.send(JSON.stringify(tarjeta));
}
mostrarUsuario();
