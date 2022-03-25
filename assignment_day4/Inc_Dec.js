const counter ={

    value:0,
    increment (){
        this.value +=1;
        console.log(this.value);
        return this;
    },
    decrement(){
        this.value -=1;
        console.log(this.value);
        return this;
    }
}


counter.increment().increment().decrement();