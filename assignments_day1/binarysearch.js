function binarySearch( list, low, high, target ) {
    if( low <= high ) {
        const mid_index = low + (high-low)/2;
        if( list[mid_index] == target ) {
            return mid_index;
        }
        if( list[mid_index] < target ) {
            return binarySearch( list, mid_index+1, high, target );
        }
        return binarySearch( list, low, mid_index-1, target );
    }
    return -1;
}


const num_arr = [1,2,4,7,90,90,1000];
const target = 90;
const result = binarySearch( num_arr, 0, num_arr.length-1, target );

if( result != -1 ) {
   console.log(`${target} is found at index ${result}`);
} else {
   console.log(`${target} is not found..`);
}