const http = require("http");
const notesRoutes = require("./routes/notesRoutes");

const server = http.createServer((req,res)=>{

    if(req.url.startsWith("/notes")){
        return notesRoutes(req,res);
    }

    res.writeHead(404);
    res.end("Route not found");

});

server.listen(3000,()=>{
    console.log("Server running on port 3000");
});