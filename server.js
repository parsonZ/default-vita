const express = require('express')
const app = express()
const port = 80
const path = require('path')

app.use('/', express.static('build'))
console.log(path.resolve(__dirname, './src/'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
