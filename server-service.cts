const fs = require("fs")
const path = require("path")
const Tesseract  = require('tesseract.js');
let list ={};
const city = "עפולה"


async function Main(folderPath="./images") {
    const files = fs.readdirSync(folderPath).filter(f =>/\.(jpg|jpeg|png)$/i.test(f));
    const results = [];

    for (const file of files) {
        console.log('file...:');

        const fullPath = path.join(folderPath, file);
        const { data: { text } } = await Tesseract.recognize(fullPath, 'heb+eng', {logger: m => {}});
        const items = extractItems(text);
        results.push(...items);
    }

    return results;
}

function extractItems(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const items = [];
  for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(city)) {
        let address = lines[i].replaceAll(`"`,``);
        let id    = '';
        let phone = '';


       for (let j = i + 1; j <= i + 2 && j < lines.length; j++) {
         const matchID = lines[j].match(/\d{4}-\d{8}/);
         if (matchID) id = matchID[0];
         const matchPhone = lines[j].match(/05\d{8}/);
         if (matchPhone) phone = matchPhone[0];
       }
        items.push({ address, id, phone });
    }
  }
    
    items.forEach((mone=>{
        if(!mone.id) return
        for(let key in list){
            for(let i=0; i<list[key].length;i++){
              if(list[key][i].id == mone.id){
                return
              }
            }
        }
        let {apartment,streetNumber,floor,street,entry} = parseAddress(mone.address)
        if(!list[street]){
            list[street] = [
                {numbers:[]}
            ]
        }
        list[street][0].numbers.push(streetNumber)
        list[street][0].numbers= sort(list[street][0].numbers)
        list[street].push(
            {
              id          : mone.id, 
              number      : mone.id.substring(mone.id.length-5,mone.id.length), 
              name        : "",
              address     : mone.address,
              city        : city,
              street      : street,
              streetNumber: streetNumber,
              house       : apartment, 
              floor       : floor,
              entry       : entry,
              phone1      : mone.phone,
              phone2      : "",
              read        : false,
              unRead      : "--",
              location    : "--",
              message     : "",
              images      : [],
              GPS         : [],
              date        : "",
          }
        )
    }))

    let json = JSON.stringify(list)
    fs.writeFileSync("data.json",json)
  return items;
}


function parseAddress(addressStr) {
        let floor="--" ,apartment="",  street="--" ,_streetNumber="--", streetNumber="--" , entry="--";
        let address = addressStr 
        .replace(/[^\u0590-\u05FF0-9\s]/g, "")  
        .replace(/\s+/g, " ")      
        .replaceAll(".","")             
        .trim();

     
        let arr = address.split(" ");
        if(!isNumber(arr[1][0])){
            address=address.replace(" ","-")
            arr = address.split(" ");
        }
        street = arr[0];
        if( !isNumber(last(arr[1])) ){
            streetNumber = arr[1].substring(0,arr[1].length-1)
            entry = last(arr[1])
        }
        else{
            streetNumber = arr[1]
        }


        arr.forEach((v)=>{
            if(v.startsWith("ד")){
                apartment = v.substring(1,v.length)
            }
            else if(v.startsWith("ק")){
                floor = v.substring(1,v.length)
            }
        })

        return{
            street,
            streetNumber,
            entry,
            floor,
            apartment
        }


}




console.log('start...:');
Main().then(result => {
  console.log('✅ All items:', result);
});



function Or(value , ...arr){
    for(let i=0;i<arr.length;i++){
        if(value == arr[i])
            return true
    }
    return false
}

function isNumber(value){
    return Or(value , '0','1','2','3','4','5','6','7','8','9')
}

function last(val , num=0){
    return val[val.length-1-num]
}

function sort(arr){
    let newArr = [];
    arr.forEach(v=>{
        if(Number(v)){
            newArr.push(Number(v))
        }
    })

    newArr.sort((a,b)=>a-b)
    return newArr.reverse()

}