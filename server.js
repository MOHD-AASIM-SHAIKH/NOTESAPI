const http = require('http');
const fs = require("fs");
const { json } = require('stream/consumers');
let notes = [];
const server = http.createServer((req,res)=>{
    if (req.url === "/" && req.method === "GET") {
        res.write("Welcome to Notes API");
        res.end();
    }
    else if(req.url ==='/notes' && req.method === "GET"){
        const data =  fs.readFileSync("notes.json");
        const notes  = JSON.parse(data);
         res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(notes));
    }
    else if(req.url.startsWith('/notes/') && req.method ==='GET'){
        const parts = req.url.split('/');
        const id = parts[2];
        const data =  fs.readFileSync("notes.json");
        const notes  = JSON.parse(data);
        const note = notes.find(n => n.id == id);
        if(!note){
            res.writeHead(404);
            return res.end("not found");
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(note));
    }
    else if(req.url ==='/notes' && req.method === 'POST'){
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () =>{
            const newnote = JSON.parse(body);
            const data = fs.readFileSync("notes.json");
            const notes =  JSON.parse(data);
            newnote.id = Date.now();
            notes.push(newnote);
            fs.writeFileSync("notes.json",JSON.stringify(notes));
            res.writeHead(201,{"content-type":"application/json"});
            res.end(JSON.stringify(newnote));

        });
    }
    else if(req.url.startsWith('/notes/') && req.method ==='DELETE'){
        const parts =  req.url.split('/');
        const id =  parts[2];
        const data  = fs.readFileSync('notes.json');
        const notes = JSON.parse(data);
        const Filterednote = notes.filter(n => n.id!=id);
        fs.writeFileSync("notes.json",JSON.stringify(Filterednote));
        res.writeHead(200);
        res.end("Note deleted");
    }
    else if (req.url.startsWith('/notes/')&& req.method === 'PUT'){
        const parts = req.url.split('/');
        const id = parts[2];

        let body  =  "";
        req.on("data",chunk => {
            body +=chunk;
        });
        req.on("end",()=>{
            const updateddata =  JSON.parse((body));
            const data = fs.readFileSync("notes.json");
            let notes = JSON.parse(data);
            
            const index = notes.findIndex(n =>n.id == id);
            if(index == -1){
                res.writeHead(404);
                return res.end("not found index ");
            }
            notes[index] = {...notes[index],...updateddata};
            fs.writeFileSync("notes.json",JSON.stringify(notes));
            res.writeHead(200, {"Content-Type":"application/json"});
            res.end(JSON.stringify(notes[index]));

        })
    }
    else{
        res.write('no route find');
        res.end();
    }
});
server.listen(3000,() =>{
    console.log("server is running on port 3000");
});