var user=JSON.parse(localStorage.getItem("user"));
var main=document.getElementById("main");
var n=0;
var prods=localStorage.getItem("ProdCarrito");
if(prods===null){
    localStorage.setItem("ProdCarrito","[]");
}
function productos(buscar,numero,t) {
    let request = new XMLHttpRequest();
    n=numero;
    request.open("GET", `http://localhost:4000/producto/${buscar}`,true);
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange=function (){
        if(this.readyState===4 && this.status===200){
            let response=JSON.parse(this.response);
            if(n!==4){
                n=response.length;
            }
            else {
                n=numero;
            }
            mostrarProducto(response,n,t);
        }
    }
    request.send();
}
function mostrarProducto(response,nums,t){
    let prod=document.createElement("section");
    prod.className="intro";
    prod.id="productos";
    let inHtml;
    for (let i = 0; i < nums; i++) {
        let ale=0;
        if(!t){
            ale = Math.floor(Math.random() * Math.floor(response.length));
        }
        else{
            ale=i;
            console.log(ale);
        }
        let div=document.createElement("div");
        let href="";
        let linka="";
        if(user!==null){;
            href="#";
            linka="Añadir al carrito";
        }
        else {
            href="Login.html";
            linka="Comprar";
        }
        div.className="card rounded";
        div.id="card";
        div.style.width="286px";
        inHtml=`<img src=${response[ale].imagen} style="width: 286px; height: 286px;" alt=${response[ale].tipo}>
                                <div class="card-body" style="background-color: beige;">
                                    <h5 class="card-title">${response[ale].nombre}</h5>
                                    <p class="card-text">${response[ale].descripcion}</p>
                                    <p class="card-text" style="font-size: 24px;">${response[ale].precio}€</p>
                                    <div id="link">
                                    <a class="btno text-black text-center" id=${response[ale].idProducto} href=${href} style="border: 1px solid;" 
                                    onclick="anaCarrito(${response[ale].idProducto})">${linka}</a>
                                    </div>
                                </div>`;
        div.innerHTML=inHtml;
        prod.appendChild(div);
    }
    main.appendChild(prod);
}
function deleteProductos(){
    let div=document.getElementById("productos");
    div.remove();
}
function anaCarrito(num){
    let prods=JSON.parse(localStorage.getItem("ProdCarrito"));
    let request = new XMLHttpRequest();
    request.open("GET", `http://localhost:4000/producto/find/${num}`, true);
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.response);
            prods.push(response);
            localStorage.setItem("ProdCarrito",JSON.stringify(prods));
        }
    }
    request.send();
}
var buscador=document.getElementById("search").addEventListener("keyup", ()=>{
    let busca=document.getElementById("search").value
    if(busca===null){
        productos("todos",3,true);
    }
    else {
        deleteProductos();
        let request = new XMLHttpRequest();
        request.open("GET", `http://localhost:4000/producto/buscar/${busca}`, true);
        request.setRequestHeader("content-type", "application/json");
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(this.response);
                mostrarProducto(response, response.length - 1);
            }
        }
        request.send();
    }
});
productos("todos",4,false);
