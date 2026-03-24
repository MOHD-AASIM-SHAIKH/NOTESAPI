const fs = require('fs');
const file =  "notes.json"

function getAllNote(){
    const data = fs.readFileSync(file);
    return JSON.parse(data);
}
function savenotes(notes){
    fs.writeFileSync(file,JSON.stringify(notes));

}
function createnotes(note){
    const notes = getAllNote();
    note.id = Date.now();
    notes.push(note);
    savenotes(notes);
    return note;
}
function deletenote(id){
    const notes = getAllNote();
    const filtered = notes.filter(n =>n.id !=id);
    savenotes(notes);
}
function getnotebyid(id){
    const notes = getAllNote();
    return notes.find(n => n.id == id);
}
function updatenotes(id,updateddata){
    const notes = getAllNote();
    const index = notes.findIndex(n=>n.id==id);
    if(index==-1) return null;
    notes[index] = {...notes[index],...updateddata};
    savenotes(notes);
    return notes[index];
}
module.exports={
    getAllNote,
    createnotes,
    updatenotes,
    getnotebyid,
    savenotes,
    deletenote
}; 
