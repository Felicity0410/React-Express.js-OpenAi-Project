require('dotenv').config()


const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI


const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()


const configuration = new Configuration({
    organization: "org-xQeaamyinqgmauk0KoSTe2tS",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))
const PORT = process.env.PORT


app.post('/', async (req, res)=>{
    const { message } = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a console terminal, answer as if you are receiving commands from a user.
        > ${message}?
        #`,
        max_tokens: 100,
        temperature: 0,
    })
    console.log(response.data);
    if(response.data){
        if(response.data.choices){
            res.json({
                message:response.data.choices[0].text
            })
        }
    }
   
})
app.listen(PORT, ()=>console.log(`server listening on port ${PORT}`))