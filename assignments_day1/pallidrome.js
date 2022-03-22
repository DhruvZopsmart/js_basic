function checkPalindrome(string){
    const length = string.length;

    for( let index=0; index<length/2; index++ ){
         if( string[index] != string[length-index-1] ) {
              return false;
         }
    }

    return true;
}

const input_str = "aacbcaa";
const output = checkPalindrome(input_str);

if( output ) {
   console.log( input_str, " is a palindrome " );
} else {
   console.log( input_str, "is not a palindrome " );
}