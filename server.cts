import { addMone, connectMongo, getAllMonim, getMoneByIdOrNumber, updateMone } from "./database";
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    authStrategy: new LocalAuth()
});




let express = require("express");
let fs =  require("fs")
let path =  require("path"); 
const PORT=3001; 

let app = express(); 

client.on('qr', (qr) => {
    console.log('Scan this QR code with your WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Ready
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});




app.use(express.static( path.join(__dirname , "") ) )
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

connectMongo();


app.get("/",(req,res,next)=>{
    let masterPage = fs.readFileSync( path.join(__dirname,"..","index.html") ) .toString();
    res.send(masterPage)
})
app.get("/all.html",(req,res,next)=>{
    let masterPage = fs.readFileSync( path.join(__dirname,"..","all.html") ) .toString();
    res.send(masterPage)
})
app.get("/style.css", (req, res, next) => {
    fs.readFile(path.join(__dirname, "..", "style.css"), "utf8", (err, data) => {
        if (err) return next(err);
        res.setHeader("Content-Type", "text/css");
        res.send(data);
    });
});
app.get("/lib/lib.css", (req, res, next) => {
    fs.readFile(path.join(__dirname, "..","lib", "lib.css"), "utf8", (err, data) => {
        if (err) return next(err);
        res.setHeader("Content-Type", "text/css");
        res.send(data);
    });
});


app.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname, "..", "mones.json"))
})
app.get("/sync", async(req,res)=>{
    let _data = fs.readFileSync(path.join(__dirname, "..", "data.json")).toString();
    let data = JSON.parse(_data);
    let resultObj = {}

    for(let key in data){
        resultObj[key] = []
        resultObj[key][0] = data[key][0]
        
        for(let i=1; i<data[key].length;i++){
            let mone =  await getMoneByIdOrNumber(data[key][i].id)
            if(mone){
                resultObj[key].push(mone)
            }
            else{
                await addMone(data[key][i])
                resultObj[key].push(data[key][i]) 
            }
        }
    } 
    res.json({resultObj})
})


app.get("/getMone/:id", async (req,res)=>{
    let id = req.params.id;
    let mone = await getMoneByIdOrNumber(id);
    res.json(mone)
})
app.post("/updatMone", async(req,res)=>{
    let mone = req.body;
    await updateMone(mone.id,mone)
    res.status(200).json({status:"good"})
})
app.get("/all", async(req,res)=>{
    let all = await getAllMonim();
    res.json({all})
})


app.post("/sendWhathapp", async(req,res)=>{
    let _phone = req.body.phone
    let message = req.body.message
    let mone = await getMoneByIdOrNumber(req.body.moneId)
    if (!_phone) {return res.status(400).json({x:'Phone is required'});}
    let phone = _phone.replace("05","9725")


    const chatId = `${phone}@c.us`;

    try {
        await client.sendMessage(chatId, message);
         res.status(200).json({x:'good'});
    } catch (err) {
        console.error(err);
        res.status(500).json({x:'good'});
    }
    
})


app.get("/clearRead", async(req,res)=>{
    //TODO 
})
app.get("/clearImageFolder", async(req,res)=>{
    //TODO 
})

app.get("/uploadImage", async(req,res)=>{
    //TODO 
})



client.initialize();

app.listen(PORT,()=>{
  console.log("http://localhost:"+PORT)
})

