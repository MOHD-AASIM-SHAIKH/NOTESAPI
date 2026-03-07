const fs = require('fs');
const file =  "notes.json"

function getallnote(){
    const data = fs.readFileSync(file);
    return JSON.parse(data);
}
function savenotes(){
    fs.writeFileSync(file,JSON.stringify(notes));

}
function createnotes(note){
    const notes = getallnote();
    note.id = Date.now();
    notes.push(note);
    savenotes(notes);
    return note;
}
function deletenote(){
    const notes = getallnote();
    const filtered = notes.filter(n =>n.id !=id);
    savenotes(notes);
}
function getnotebyid(id){
    const notes = getAllNotes();
    return notes.find(n => n.id == id);
}
function updatenotes(id,updateddata){
    const notes = getallnote();
    const index = notes.filterIndex(n=>n.id==id);
    if(id==-1) return null;
    notes[index] = {...notes[index],...updateddata};
    savenotes(notes);
    return notes[index];
}
module.exports={
    getallnote,
    createnotes,
    updatenotes,
    getnotebyid,
    savenotes,
    deletenote
}; 
