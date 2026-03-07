const http = require('http');
const { json } = require('stream/consumers');
let notes = [];
const server = http.createServer((req,res)=>{
    if (req.url === "/" && req.method === "GET") {
        res.write("Welcome to Notes API");
        res.end();
    }
    else if(req.url === '/notes' && req.method ==='GET'){
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(notes));
    }
    else if(req.url ==='/notes' && req.method === 'POST'){
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", () =>{
            const newnote = JSON.parse(body);
            notes.push(newnote);
            res.writeHead(201,{"content-type":"application/json"});
            res.end(JSON.stringify(newnote));

        });
    }
    else{
        res.write('no route find');
        res.end();
    }
});
server.listen(3000,() =>{
    console.log("server is running on port 3000");
});