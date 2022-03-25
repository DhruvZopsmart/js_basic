
function add_print_sub_inc_dec(){
    let v = 0

    function add (value){
        v+=value;
    }
    function sub(value){
        v-=value;
    }
    function inc(){
        v++;
    }
    function dec(){
        v--;
    }
    function print(){
        console.log(v);
    }

    return {add, sub, inc, dec, print};
}

let a = add_print_sub_inc_dec();
a.add(2);
a.print();