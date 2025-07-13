let AllMonesObj = {};
let AllMonesArr = [];




function convertObjToArr(obj) {
    let result = [];
    for (let key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length > 1) {
            result.push(...obj[key].slice(1)); // skip the first element (y)
        }
    }
    return result;
}


//get
let page :IPage = "list";
let pageCount = 0;
let activeMone : IMone = null 
let lenRead = 0;
let lenUnRead = 0;
let lenNew = 0;
let aa=0;

//set
function setActiveMone(mone:IMone){
    activeMone = mone
}
function setPage(_page:IPage){
    setHistory()
    if(_page == "list"){
        noneDisplay("settingsPage","monePage");
        blockDisplay("listPage");
    }
    else if(_page=="mone"){
        noneDisplay("listPage","settingsPage");
        blockDisplay("monePage");
    }
    else if(_page=="settings"){
        noneDisplay("listPage","monePage");
        blockDisplay("settingsPage");
    }
    page=_page;
    pageCount = 0;
}


function onActivePage(_page:IPage,call){
    setInterval(()=>{
        if(page!=_page || pageCount!=0  )return;
            console.log("render "+_page)
            pageCount++;
            call()
    },200)
}
function setStatus(){
    lenRead = 0;
    lenUnRead = 0;
    lenNew = 0;
    for(let i=0;i<AllMonesArr.length;i++){
        if(AllMonesArr[i].read){
            lenRead++
        }
        else if(AllMonesArr[i].unRead !== "--" ){
            lenUnRead++
        }
        else{
            lenNew++
        }
    }

    document.getElementById("status").innerHTML =  `NEW - ${lenNew} | UN - ${lenUnRead} | R - ${lenRead} `

}

function setRead(mone:IMone){
    lenRead++;
    lenNew--;
    mone.read = true;
    
    let elem = document.getElementById(`mone-${mone.id}`)
    elem.className += ' read'


    let status = document.getElementById("status");
    let countCategory = document.getElementById(`categories-${mone.street}-new`)
    console.log(countCategory ,  `categories-${mone.street}-new`)
    status.innerHTML =  `NEW - ${lenNew} | UN - ${lenUnRead} | R - ${lenRead} `
    countCategory.innerHTML = Number(countCategory.innerHTML) - 1 +" ";
    console.log( "num", Number(countCategory.innerHTML) )

    
    if(Number(countCategory.innerHTML) < 1){
        countCategory.className += " finish"
    }
}
function setUnRead(mone:IMone){
    lenUnRead++;
    lenNew--;
    
    let elem = document.getElementById(`mone-${mone.id}`)
    elem.className += ' unRead'

    let status = document.getElementById("status");
    let countCategory = document.getElementById(`categories-${mone.street}-new`)
    
    status.innerHTML =  `NEW - ${lenNew} | UN - ${lenUnRead} | R - ${lenRead} `

    countCategory.innerHTML = Number(countCategory.innerHTML) - 1 +" ";
    if(Number(countCategory.innerHTML) <1){
        countCategory.className += " finish"
    }
}