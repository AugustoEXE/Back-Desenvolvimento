
const fs = require('fs')





fs.readFile('./test.jpg', function(err, data){
    if (err) throw err;
    let encodedImage = new Buffer(data, 'binary').toString('base64');
    console.log(encodedImage)
    return
});
    