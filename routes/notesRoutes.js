const controller = require("../controllers/notesController");

function notesroutes(req,res){
    if(req.url === '/notes' && req.method ==='GET'){
        return controller.getnotes(req,res);
    }
    if(req.url ==='/notes' && req.method === 'POST'){
        return controller.createnotes(req,res);
    }
    if(req.url.startsWith('/notes')){
        const id = req.url.split('/')[2];

        if(req.method === 'GET'){
            return controller.getnote(req,res,id);
        }
        if(req.method === 'DELETE'){
            return controller.deletenote(req,res);
        }
        if(req.method === 'PUT'){
            return controller.updatenote(req,res,id);
        }
    }
}
module.exports = notesroutes;