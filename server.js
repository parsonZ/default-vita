const express = require('express')
const app = express()
const port = 80

app.use('/', express.static('build'))

// app.get('/', (req, res) => () => {
//     console.log(__dirname)
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
