
let n = 3;

function callme() {
    let i = 0;

    function hello() {
        i++;
        if (i == n) {
             return 'hello';
         }
    }
    return hello;
}

let a = callme();
console.log(a());
console.log(a());
console.log(a());
