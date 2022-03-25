const obj = {
    b: 10,
    c: {
      d: {
        e: 20,
      },
    },
  };
  

  
  function show(obj) {
    if(obj === null || typeof obj !== 'object')
      return obj;
    let copyObj = {};
    Object.keys(obj).forEach((key) => {
      if(obj.hasOwnProperty(key)){
        copyObj[key] = show(obj[key]);
      }
    });
    return copyObj;
  }
  let cloneObj = show(obj);
  obj.c.d.e= 30;
  console.log(obj.c.d.e);
  console.log(cloneObj.c.d.e);
  
  