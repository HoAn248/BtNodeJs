const mongoose = require('mongoose')
const url = "mongodb+srv://hoducan24082002User:ducAnho123@cluster0.is2ds.mongodb.net/Users?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('kết nối');
})
const schema = mongoose.Schema
module.exports.schema = schema