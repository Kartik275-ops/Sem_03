const http = require('http');


const server = http.createServer((req,res)=>{


    if(  req.method=== 'GET' && req.url === '/'){
        res.end('Welcome to the Home Page');
    }
    else if(req.method=== 'POST' && req.url === '/about'){
        res.end('Welcome to the About Page');
    }
    else if(req.method=== 'GET' && req.url === '/contact'){
        res.end('Welcome to the Contact Page');
    }
    else if(req.method=== 'GET' && req.url === '/services'){
        res.end('Welcome to the Services Page');
    }
    else{
        res.end('404 Page Not Found');
    }

    
});


server.listen(3000,()=>{
    console.log('Server is running on port 3000');
}   );  