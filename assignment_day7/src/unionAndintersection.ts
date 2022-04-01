interface firstname{
    firstname:string;
}
interface lastname{
    lastname:string;
}

type name = (firstname & lastname) | null  ;

function printname(value:name):void{
    if(value)
    console.log(value.firstname , value.lastname );
}
printname(null);

