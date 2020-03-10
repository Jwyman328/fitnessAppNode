const mongoose = require('mongoose')

//mongodb://<dbuser>:<dbpassword>@ds031203.mlab.com:31203/heroku_tpgqpjr3
//'mongodb://127.0.0.1:27017/fitnessNode'

const uri = process.env.MONGODB_URI || 'mongodb://mongo:27017/fitnessNode';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})

