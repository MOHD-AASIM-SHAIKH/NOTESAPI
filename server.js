const http = require('http');
const server = http.createServer((req,res)=>{
    if (req.url === "/" && req.method === "GET") {
        res.write("Welcome to Notes API");
        res.end();
    }
    else if(req.url === '/notes' && req.method ==='GET'){
        res.write('here are all notes');
        res.end();
    }
    else if(req.url ==='/createnotes' && req.method === 'POST'){
        res.write('create new note');
        res.end();
    }
    else{
        res.write('no route find');
        res.end();
    }
});
server.listen(3000,() =>{
    console.log("server is running on port 3000");
});