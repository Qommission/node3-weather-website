const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Whether App',
        name: 'Q'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'It has begun',
        name: 'Q'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: "You're after some help?",
        body: "You'll find no help here...",
        name: "Q"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No! You need to give an address  D:<"
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You have to search something"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})


app.get("/help/*", (req,res) => {
    res.render('404',{
        title: "Error 404 D:",
        body: "** You know the drill **",
        errorMsg: "Your help article isn't in this locale! :(",
        extension: "/help",
        redirect: "Help"
    });
})


app.get('*', (req, res) => {
    res.render('404',{
        title: "Error 404 D:",
        body: "** You know the drill **",
        errorMsg: "I have no clue where you think you're going but it ain't here.",
        extension: "/",
        redirect: "Home"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000! :D')
})