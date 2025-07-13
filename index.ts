(async ()=>{
    console.log("start")
    let __data = await GET("/sync")
    AllMonesObj = __data["resultObj"]
    // console.log(AllMonesObj)
    AllMonesArr = convertObjToArr(AllMonesObj);

    list();
    mone();
    setPage("list")
    setStatus();
})();



let search = document.getElementById("searchInp")

search.addEventListener("input",(e)=>{
    let target = (e.target as HTMLInputElement);
    let val = target.value;
    
    if(val.length == 5){
        let _mone = AllMonesArr.find(mone=>mone.number == val)

        if(_mone){
            setActiveMone(_mone)
            setPage("mone")
            target.value = ""
        }else{
            Alert("מונה לא נמצא","red")
        }
    }
    
})