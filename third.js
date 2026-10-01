const fs = require('fs');


fs.writeFile('example.txt',' fm kjnfkjeshvjopev ekdsnjndejovnevnvfkjv vnfijvnfjvnne v',(err)=>{
      if(err) throw err;
      console.log('File Created');
});

fs.readFile('example.txt','utf8',(err,data)=>{
   console.log('File content: ', data);
});


fs.writeFile('example.txt','This is the updated content.',(err)=>{
   if(err) throw err;
   console.log('File overwritten (updated)!');
});

fs.appendFile('example.txt','\nThis line was added.',(err)=>{
   if(err) throw err;
   console.log('File updated (appened)!');
});

// fs.unlink('example.txt',(err)=>{
//  if(err) throw err;req,res
//  console.log('File deleted!');
// });