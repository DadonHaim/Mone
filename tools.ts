
async function GET(url){
    return new Promise((resolve,reject)=>{
        fetch(url).then(d=>d.json()).then(v=>resolve(v)).catch(e=>reject(e))
    })
}
function POST(url,data){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(typeof data=="object" ? data :{data})
        })
        .then(d=>d.json())
        .then(v=>resolve(v))
        .catch(e=>reject(e))
    })
}

function createRandomId(){
    return "id"+((Math.random()*8888).toString().replace(".",""))
}



function popup(html,call){
    isPopup = true;
    setHistory();
    let pop = document.getElementById("popup");
    let popupContext = document.getElementById("popupContext");
    let cancelpopup = document.getElementById("cancelpopup");

    pop.style.display="flex"
    popupContext.innerHTML = html;
    cancelpopup.onclick=()=>{
        isPopup = false;
        popupContext.innerHTML = ""
        pop.style.display ="none"
    }

    setTimeout(()=>call(),560)
}

function setHistory(){
    history.pushState({page: aa++}, "title "+aa, "?page="+(aa));
}
let isPopup = false;
window.addEventListener('popstate', function (event) {
    if(isPopup){
        let pop = document.getElementById("popup");
        let popupContext = document.getElementById("popupContext");
        popupContext.innerHTML = ""
        pop.style.display ="none"
        isPopup = false
    }
    else{
        setPage("list");
    }
});