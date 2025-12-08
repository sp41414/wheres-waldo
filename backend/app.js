require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'https://find-waldo.pages.dev'
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: allowedOrigins,
}))
app.use(helmet())
app.use("/api", require('./src/routes'))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: {
            message: err.message,
            timestamp: new Date().toISOString(),
        },
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`App listening on PORT ${PORT}`)
})
