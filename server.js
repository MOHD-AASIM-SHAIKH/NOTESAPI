const http = require('http');
const server = http.createServer((req,res)=>{
    res.write("hello this node server");
    res.end();
});
server.listen(3000,() =>{
    console.log("server is running on port 3000");
});