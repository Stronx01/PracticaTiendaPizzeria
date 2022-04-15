function misTarjetas(){
    let usu=JSON.parse(localStorage.getItem("user"));
    let request=new XMLHttpRequest();
    request.open("GET",`http://localhost:4000/tarjeta/porUsu/${usu.email}`,true)
    request.setRequestHeader("content-type", "application/json");
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200){
            let response=JSON.parse(this.response);
            mostrarListaTarjeta(response);
        }

    }
    request.send()
}
function mostrarListaTarjeta(response){
    let row=document.getElementById("COL");
    let col=document.createElement("div");
    col.id="COL";
    col.className="row";
    col.style.padding="30px";
    col.style.alignContent="center";
    let input2s="";for(let i=0;i<response.length;i++) {
        input2s+=`<li class="list-group-item" style="background-color: #868686; border-radius: 20px">
                    <input class="form-check-input" type="radio" name="flexRadioDefault"  id=${response[i].numero} onclick="asignaTarj${response[i].numero})">
                    <label class="form-check-label" for="flexRadioDefault1" >${response[i].numero}</label>
                  </li>`
    }
    input2s+="";
    col.innerHTML=input2s;
    row.appendChild(col);
}
function mostrarFactura(){
    let prods=JSON.parse(localStorage.getItem("ProdCarrito"))
    let row=document.getElementById("ROW");
    let col=document.createElement("div");
    let sum=sumPrecio();
    col.id="facCol";
    col.className="col";
    col.style.padding="30px";
    col.style.alignContent="center";
    let input1s=`<h1 id="tilt">Tu Pedido</h1>`
    let input2s=`<div class="row" style="justify-content: space-around; border-bottom: solid 1px">
                    <div class="col"><h2>Pedido</h2></div> <div class="col"><h2>Precio</h2></div> 
                 </div>`
   let input3s="";for(let i=0;i<prods.length;i++) {
        input3s+=`
        <div class="row" style="justify-content: space-around;">
                    <div class="col"><h2>${prods[i].tipo} ${prods[i].nombre}</h2></div> <div class="col"><h2>${prods[i].precio} €</h2></div> 
        </div>`
    }
    let input4s=`<div class="row" style="justify-content: space-around; border-top: solid 1px">
                    <div class="col"><h2>Total</h2></div> <div class="col"><h2>${sum} €</h2></div>
                    <div><button class="btno" style="border: 1px solid; border-radius: 5px;" onfocus="enviarFactura()">Comprar</button></div>
                 </div>`
    input3s+="";
    col.innerHTML=input1s+input2s+input3s+input4s;
    row.appendChild(col);
}
function sumPrecio(){
    let prods=JSON.parse(localStorage.getItem("ProdCarrito"));
    let sum=0;
    for (let i=0;i<prods.length;i++){
        sum+=prods[i].precio;
    }
    return sum;
}
function enviarFactura(){
    let productos=JSON.parse(localStorage.getItem("ProdCarrito"));
    let ArrayProd=[];
    for (let i=0;i<productos.length;i++){
            let prod=productos[i].idProducto;
            let precio=productos[i].precio;
        let producto={
            idProducto: prod,
            cantidad: 1,
            precioVenta: precio
        }
        ArrayProd.push(producto);
    }
    for(let i=0;i<productos.length;i++){

    }
    let usuario=JSON.parse(localStorage.getItem("user"));
    let linea={
        email: usuario.email,
        productosCarrito: ArrayProd
    }
    envFac(linea);
}
function envFac(Linea){
    let tit=document.getElementById("tilt");
    let request=new XMLHttpRequest();
    request.open("POST","http://localhost:4000/pedido/alta", true);
    request.setRequestHeader("content-type", 'application/json');
    request.onreadystatechange=function (){
        if(this.readyState===4&&this.status===200) {
            let response = this.response;
        }
    }
    request.send(JSON.stringify(Linea));
    localStorage.setItem("ped",JSON.stringify(Linea));
    tit.innerHTML="Pedido Realizado";
    localStorage.setItem("ProdCarrito",JSON.stringify([]));
}
misTarjetas();
mostrarFactura();
