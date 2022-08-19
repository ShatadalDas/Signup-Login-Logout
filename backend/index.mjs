import express from 'express'
import cors from "cors"
import signupRoute from "./api/signup.mjs"
import loginRoute from "./api/login.mjs"
import './db/conn.mjs'
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//Routes
app.use('/api/signup', signupRoute)
app.use('/api/login', loginRoute)


app.listen(4000, () => {
    console.log('Listening....')
})
