const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const ShortUrl = require('./models/shortUrls')
require('./config/mongoose')


//handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    console.log(shortUrls)
    res.render('index', shortUrls. shortUrls)
})

app.post('/shortUrls', async (req, res) => { 
   await ShortUrl.create({ full: req.body.fullUrl }) //req.body -> 從form裡面拿資料進入mongodb database. { full: xxx } -> 針對 shortUrls.js 此file
   res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl === null) return res.sendStatus(404)

    shortUrl.clicks ++
    shortUrl.save()

    res.redirect(shortUrl.full)
})


// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
  })