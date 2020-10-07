// Imports
const express = require('express')
const mongoose = require('mongoose')
const Item = require('./cartitem')

// Express
const app = express()
app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: true }))


// MongoDB connection
const dbConnect = "mongodb+srv://a1-user:t6iUQYXA9VBtEMfU@cluster0.nhsmm.mongodb.net/csc301-a1-data?retryWrites=true&w=majority"
mongoose.connect(dbConnect, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log("connected to db");
    app.listen(3000);
}).catch((err) => {
    console.log(err)
})


// Listeners
app.get('/', (req, res) => {
    Item.find().then(items => {
        res.render('index', { items })
    })
})

app.get('/add-item', (req, res) => {
    res.render('add-item')
})

app.post('/add', (req, res) => {
    console.log(req.body)
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })

    item.save().then(result => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })

})

app.get('/remove/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id).then(result => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
})

app.get('/removeall', (req, res) => {
    Item.deleteMany({}).then(result => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
})

app.use((req, res) => {
    res.write("Error 404")
})