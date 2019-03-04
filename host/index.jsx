// function openDocument(){
//     var fileRef = new File("~/Downloads/MyFile.jpg");
//     var docRef = app.open(fileRef);
//     }

function openDocument(location){
var fileRef = new File(location);
var docRef = app.open(fileRef);
}