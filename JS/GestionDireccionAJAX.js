function btnDir(){
    let direc=document.getElementById("BuscarDireccion");
    let usu=JSON.parse(localStorage.getItem("user"));
    let direccion={
        idDireccion: null,
        direccion: "algunLugar2"
    }
    altaDir(direccion,usu.email);

}
function altaDir(direccion,email){
    let request=new XMLHttpRequest();
    request.open("POST",`http://localhost:4000/direccion/alta/${email}`,true);
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange=function () {
        if (this.readyState === 4 && this.status === 200) {
            let response=this.response;
        }
    }
    request.send(JSON.parse(direccion));
}
function recojeDir(){
    let usu=JSON.parse(localStorage.getItem("user"));
    let request=new XMLHttpRequest();
    request.open("GET",`http://localhost:4000/direccion/${usu.email}`,true)
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200){
            let response=JSON.parse(this.response);
            muestraDir(response);
        }

    }
    request.send()
}
function asignarDir(num){
    let request=new XMLHttpRequest();
    request.open("GET",`http://localhost:4000/direccion/buscar/${num}`,true)
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200){
            let response=JSON.parse(this.response);
            localStorage.setItem("direc",JSON.stringify(response));
        }

    }
    request.send()
}
function muestraDir(response){
    let div=document.getElementById("ulDireecion");
    let ul=document.createElement("ul");
    ul.className="list-group"
    let li="";for(let i=0;i<response.length;i++) {
            li+=`<li class="list-group-item">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id=${response[i].idDireccion} onclick="asignarDir(${response[i].idDireccion})">
                    <label class="form-check-label" for="flexRadioDefault1">${response[i].direccion}</label>
                  </li>`
        }
        li+="";
    ul.innerHTML=li;
    div.appendChild(ul);
}
recojeDir();