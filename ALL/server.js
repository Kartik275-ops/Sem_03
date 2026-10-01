const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const PORT = 3000;

const emitter = new EventEmitter();

const dataFile = path.join(__dirname, 'data.txt');


// ==========================================
// EVENT EMITTER
// ==========================================

emitter.on('greet', (name) => {
    console.log(`Greet event triggered for ${name}`);
});


emitter.on('exit', () => {
    console.log('Exit event triggered');
});


// ==========================================
// HELPER FUNCTION: SEND JSON RESPONSE
// ==========================================

function sendJSON(res, statusCode, data) {

    res.writeHead(statusCode, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(data));
}


// ==========================================
// HELPER FUNCTION: READ REQUEST BODY
// ==========================================

function getRequestBody(req) {

    return new Promise((resolve, reject) => {

        let body = '';

        req.on('data', (chunk) => {

            body += chunk.toString();

        });


        req.on('end', () => {

            try {

                const data = JSON.parse(body || '{}');

                resolve(data);

            } catch (error) {

                reject(error);

            }

        });

    });

}


// ==========================================
// CREATE HTTP SERVER
// ==========================================

const server = http.createServer(async (req, res) => {

    const parsedURL =
        new URL(
            req.url,
            `http://${req.headers.host}`
        );


    const pathname =
        parsedURL.pathname;


    console.log(
        `${req.method} ${pathname}`
    );


    // ======================================
    // SERVE INDEX.HTML
    // ======================================

    if (
        req.method === 'GET' &&
        pathname === '/'
    ) {

        const filePath =
            path.join(
                __dirname,
                'public',
                'index.html'
            );


        fs.readFile(
            filePath,
            (error, data) => {

                if (error) {

                    res.writeHead(500);

                    res.end(
                        'Error loading index.html'
                    );

                    return;

                }


                res.writeHead(200, {
                    'Content-Type':
                        'text/html'
                });


                res.end(data);

            }
        );

        return;
    }


    // ======================================
    // 1. GREET EVENT
    // ======================================

    if (
        req.method === 'GET' &&
        pathname === '/greet'
    ) {

        const name =
            parsedURL.searchParams.get('name')
            || 'Guest';


        emitter.emit(
            'greet',
            name
        );


        sendJSON(
            res,
            200,
            {
                success: true,
                message: `Hello ${name}!`,
                event: 'greet'
            }
        );

        return;
    }


    // ======================================
    // 2. EXIT EVENT
    // ======================================

    if (
        req.method === 'GET' &&
        pathname === '/exit'
    ) {

        emitter.emit('exit');


        sendJSON(
            res,
            200,
            {
                success: true,
                message:
                    'Exit event triggered!',
                event: 'exit'
            }
        );

        return;
    }


    // ======================================
    // 3. EVENT LOOP DEMO
    // ======================================

    if (
        req.method === 'GET' &&
        pathname === '/eventloop'
    ) {

        const order = [];


        order.push(
            '1. Synchronous code started'
        );


        process.nextTick(() => {

            order.push(
                '2. process.nextTick()'
            );

        });


        setImmediate(() => {

            order.push(
                '3. setImmediate()'
            );

        });


        setTimeout(() => {

            order.push(
                '4. setTimeout()'
            );


            sendJSON(
                res,
                200,
                {
                    success: true,
                    order: order
                }
            );

        }, 0);


        return;
    }


    // ======================================
    // 4. CREATE FILE
    // ======================================

    if (
        req.method === 'POST' &&
        pathname === '/create'
    ) {

        try {

            const body =
                await getRequestBody(req);


            const text =
                body.text || '';


            fs.writeFile(
                dataFile,
                text,
                (error) => {

                    if (error) {

                        sendJSON(
                            res,
                            500,
                            {
                                success: false,
                                message:
                                    'Error creating file'
                            }
                        );

                        return;
                    }


                    sendJSON(
                        res,
                        200,
                        {
                            success: true,
                            message:
                                'File created successfully',
                            text: text
                        }
                    );

                }
            );

        } catch (error) {

            sendJSON(
                res,
                400,
                {
                    success: false,
                    message:
                        'Invalid JSON data'
                }
            );

        }

        return;
    }


    // ======================================
    // 5. READ FILE
    // ======================================

    if (
        req.method === 'GET' &&
        pathname === '/read'
    ) {

        fs.readFile(
            dataFile,
            'utf8',
            (error, data) => {

                if (error) {

                    if (
                        error.code === 'ENOENT'
                    ) {

                        sendJSON(
                            res,
                            404,
                            {
                                success: false,
                                message:
                                    'File does not exist. Create it first.'
                            }
                        );

                        return;
                    }


                    sendJSON(
                        res,
                        500,
                        {
                            success: false,
                            message:
                                'Error reading file'
                        }
                    );

                    return;

                }


                sendJSON(
                    res,
                    200,
                    {
                        success: true,
                        message:
                            'File read successfully',
                        content: data
                    }
                );

            }
        );

        return;
    }


    // ======================================
    // 6. UPDATE FILE
    // ======================================

    if (
        req.method === 'PUT' &&
        pathname === '/update'
    ) {

        try {

            const body =
                await getRequestBody(req);


            const text =
                body.text || '';


            fs.appendFile(
                dataFile,
                '\n' + text,
                (error) => {

                    if (error) {

                        sendJSON(
                            res,
                            500,
                            {
                                success: false,
                                message:
                                    'Error updating file'
                            }
                        );

                        return;
                    }


                    sendJSON(
                        res,
                        200,
                        {
                            success: true,
                            message:
                                'File updated successfully',
                            addedText: text
                        }
                    );

                }
            );

        } catch (error) {

            sendJSON(
                res,
                400,
                {
                    success: false,
                    message:
                        'Invalid JSON data'
                }
            );

        }

        return;
    }


    // ======================================
    // 7. DELETE FILE CONTENT
    // ======================================

    if (
        req.method === 'DELETE' &&
        pathname === '/delete'
    ) {

        fs.writeFile(
            dataFile,
            '',
            (error) => {

                if (error) {

                    sendJSON(
                        res,
                        500,
                        {
                            success: false,
                            message:
                                'Error clearing file'
                        }
                    );

                    return;

                }


                sendJSON(
                    res,
                    200,
                    {
                        success: true,
                        message:
                            'File content cleared successfully'
                    }
                );

            }
        );

        return;
    }


    // ======================================
    // 404 NOT FOUND
    // ======================================

    sendJSON(
        res,
        404,
        {
            success: false,
            message: 'Route not found'
        }
    );

});


// ==========================================
// START SERVER
// ==========================================

server.listen(
    PORT,
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    }
);