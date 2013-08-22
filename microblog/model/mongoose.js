var mongoose = require('mongoose');
module.exports = {
     mongoose:mongoose,
     db : mongoose.createConnection('mongodb://127.0.0.1:27017/microblog')
}