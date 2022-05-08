const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
const productRoutes = require('./routes/productRoutes')
const port = 3000;

// Database Connection
const DATABASE_URL = 'mongodb+srv://prashant2063:BEB0H2d47QIQ72Xc@cluster0.jbini.mongodb.net/ShopBridge?retryWrites=true&w=majority';
mongoose.connect(DATABASE_URL)
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS exception
app.use(cors())

app.use('/api/product', productRoutes);
  
app.use(express.static(path.join(__dirname, "public", "dist", "shop-bridge")))
app.get('*',(request, response)=>{
    response.sendFile(path.join(__dirname,"public","dist","shop-bridge","index.html"))
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})