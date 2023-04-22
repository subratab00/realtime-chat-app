const express = require('express')
const app = express()
const hbs = require('hbs');
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = process.env.PORT || 3000;

// public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// set view engine 
app.set('view engine', 'hbs');
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));


// routing
app.get('', (req, res) => {
    res.render("index");
});

// create server 
http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// Socket 
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})