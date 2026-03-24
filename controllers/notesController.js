const service =  require('../services/notesService');

function getnotes(req,res){
    const notes = service.getAllNote();
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify(notes));
}

function createnotes(req,res){
    let body = " ";
    req.on("data",chunk=> {
        body+=chunk;
    });
    req.on("end",()=>{
        const note = JSON.parse(body);
        const create = service.createnotes(note);

        res.writeHead(200,{"content-type":"application.json"});
        res.end(JSON.stringify(create));

    });
} 
function deletenote(req,res,id){
    service.deletenote(id);
    res.writeHead(200,{"content-type":"application.json"});
    res.end("deleted");
}

function getnote(req,res,id){
    const note = service.getnotebyid(id);
    if(!note){
        res.writehead(404);
        return res.end("not found")
    }
    res.writeHead(200,{"content-type":"application.json"});
    res.end(JSON.stringify(note));
}
function updatenote(req,res,id){
    let body = " ";
    req.on("data",chunk=> body+=chunk);
    req.on("end",()=>{
        const update =JSON.parse(body);
        const updatednote =  service.updatenotes(id,update);
        if(!updatednote){
            res.writeHead(404);
            return res.end("Not found");
        }
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(JSON.stringify(updatednote));
    });
}
module.exports={
    updatenote,
    getnote,
    deletenote,
    getnotes,
    createnotes

}