class dothis{
   
    evaluate( ){
        console.log(this.aptitude + this.coreskill);
    }
}
const a = [{aptitude :1, coreskill:2},{aptitude :1, coreskill:3},{aptitude :1, coreskill:4}];
const instructor = new dothis;
for(let i = 0 ;i<a.length;i++){
    instructor.evaluate.apply(a[i]);
}