let value = 0;

function sum(v) {
    if (v != undefined) {
        value += v;
        return sum;
    }
    else {
        console.log(value);
    }

}

sum(2)(3)();