const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()

// Paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location.
app.set('view engine', 'hbs') // Dynamic web pages.
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use.
app.use(express.static(publicDirectoryPath)) // Static web pages.

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather is fine',
        'temperature': 25,
        'author': 'AlexZ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'Weather is fine',
        'email': 'a.zhelepov@gmmmail.ru',
        'author': 'AlexZ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Weather is fine',
        'message': 'None will help you',
        'author': 'AlexZ'
    })
})

// API call.
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address string first!'
        })
    }

    const address = req.query.address
    geocode(address, (error, { longitude, lattitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        console.log('Error!')
        weather({ longitude, lattitude }, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({ address, location, forecastData })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

// wildcard charachter for /help url.
app.get('/help/*', (req, res) => {
    res.render('error', {
        'title': '404',
        'message': 'The article was not found!',
        'author': 'AlexZ'
    })
})

// * wildcard: match anything else.
app.get('*', (req, res) => {
    res.render('error', {
        'title': '404',
        'message': 'Page not found',
        'author': 'AlexZ'
    })
})

// Runs up the server.
app.listen(3000, () => {
    console.log('Server has started on port 3000.')
})