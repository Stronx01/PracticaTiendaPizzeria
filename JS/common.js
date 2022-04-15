var cliente=JSON.parse(localStorage.getItem("user"));
var perf=document.getElementById("perf");
var cls=document.getElementById("clsSesion");
var log=document.getElementById("login");
if(cliente!=null){
    log.style.display="none";
    cls.style.display="";
    perf.style.display=""
}