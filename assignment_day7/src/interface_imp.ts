interface xandy {
    x: number;
    y: number;
}


function interface_expample(obj: xandy): void {
    console.log(obj.x, obj.y);
}
const obj = { x: 1, y: 2 };

interface_expample(obj);


////

interface studentd {
    name: string;
    rollno: number;
    show(): void;
}

class student implements studentd {
    name: string;
    rollno: number;
    constructor(rollno: number, name: string) {
        this.name = name;
        this.rollno = rollno;
    }

    show(): void {
        console.log(`${this.name} has rollno ${this.rollno}`);
    }
}

const studnet1 = new student(1, 'dhruv');
studnet1.show();