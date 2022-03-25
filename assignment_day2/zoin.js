

function zoin(...obj){
// console.log(obj)
let string="";
for(let i = 0 ; i<obj.length ;i++){
    string += obj[i];
}
console.log(string);
}


zoin("z","o","p","s","m","a","r","t") // return "zopsmart"
zoin("a", "b", "c"); // return "abc"