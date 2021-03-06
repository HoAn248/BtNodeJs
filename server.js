const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const { schema } = require('./mongoosedb')
const userSchema = new schema({
    name: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        trim: true
    },
    avatar: {
        type: String,
        trim: true,
        default: '123456789'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        private: true
    }

},
    {
        collection: 'UserSchema'
    })
const UserSchema = mongoose.model('UserSchema', userSchema)
UserSchema.find({})
const product = new schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number
    },
    imagePath: Array,
    categoryName: {
        type: String,
        trim: true
    },
    brandName: {
        type: String,
        trim: true
    },
    CPU: {
        type: String,
        trim: true
    },
    screenSize: {
        type: String,
        trim: true
    },
    RAM: {
        type: Number
    },
    maxRAM: {
        type: Number
    },
    GPU: {
        type: String,
        trim: true
    },
    graphicCard: {
        type: String,
        trim: true
    },
    OS: {
        type: String,
        trim: true
    }
},
    {
        collection: 'Products'
    }
)
const Product = mongoose.model('Products', product)
const receipts = new schema({
    buyerId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    payInMethod: {
        type: String,
        enum: ['cash', 'credit card', 'installment']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'Receipts'
})
const Receipts = mongoose.model('Receipts', receipts)

const buyer = new schema({
    firstName: String,
    lastName: String,
    gender: {
        type:String,
        enum: ['male', 'female', 'secret']
    },
    age: Number,
    boughtProductId: Array,
    phoneNumber: String,
    email: String
},{
    collection: 'Buyer'
})
const Buyer = mongoose.model('Buyer', buyer)
// Buyer.create({
//     firstName: "V??n",
//     lastName: "H???",
//     gender: 'male',
//     age: 23,
//     boughtProductId: ['lenovo','asus','hp','dell'],
//     phoneNumber: 'van52809@donga.edu.vn'
// })

// l???y > 20 tu???i
Buyer.find({age:{$gt:20}})
.then(data => {
    console.log('l???y > 20 tu???i', data);
})

// l???y >= 23 tu???i
Buyer.find({age:{$gte:23}})
.then(data => {
    console.log('l???y >= 23 tu???i', data);
})

// <= 20
Buyer.find({age:{$lte:20}})
.then(data => {
    console.log('<= 20', data);
})

// 20 ho???c 30
Buyer.find({$or:[{age:20},{age:30}]})
.then(data => {
    console.log('20 ho???c 30',data);
})

// email ??u??i donga.edu.vn
Buyer.find({email:/donga.edu.vn/})
.then(data => {
    console.log('email ??u??i donga.edu.vn',data);
})


// t??n v??n ho???c v??n
Buyer.find({$or:[{firstName:'V??n'},{firstName:'V??n'}]})
.then(data => {
    console.log('t??n v??n ho???c v??n',data);
})

// Ng???c nam
Buyer.find({$and:[{firstName:'Ng???c'},{gender:'male'}]})
.then(data => {
    console.log('t??n Ng???c gi???i t??nh nam',data);
})

// thi???u tr?????ng number
Buyer.find({phoneNumber:null})
.then(data => {
    console.log('thi???u tr?????ng number',data);
})


// thi???u tr?????ng email
Buyer.find({email:null})
.then(data => {
    console.log('thi???u tr?????ng email',data);
})

// c?? s??? ??i???n tho???i b???t ?????u v???i 034
Buyer.find({phoneNumber:/^034/})
.then(data => {
    console.log('?? s??? ??i???n tho???i b???t ?????u v???i 034',data);
})

//Hi???n th??? nh???ng buyer mua tr??n 3 m??n h??ng.
Buyer.find({ "boughtProductId.3":{ "$exists": true }})
.then(data => {
    console.log('Hi???n th??? nh???ng buyer mua tr??n 3 m??n h??ng.',data);
})

//Hi???n th??? nh???ng s???n ph???m m??y t??nh c?? RAM l?? 8Gb v?? kh??ng th??? n??ng c???p th??m. 
Product.find({})
.then(data => {
    console.log('Hi???n th??? nh???ng s???n ph???m m??y t??nh c?? RAM l?? 8Gb v?? kh??ng th??? n??ng c???p th??m. ');
    data.forEach(e=>{
        if(e.maxRAM - e.RAM === 0 ){
            console.log(e);
        }
    })
})
// Hi???n th??? nh???ng h??a ????n ???????c t???o tr?????c ng??y h??m qua
Receipts.find({})
.then(data => {
    console.log('Hi???n th??? nh???ng h??a ????n ???????c t???o tr?????c ng??y h??m qua');
    let date = new Date()
    data.forEach(e=>{
        let timeData = e.createdAt
        let result = date.getTime() - 1440000
        if(timeData.getTime() < result){
            console.log(e);
        }
    })
})
Product.find({$or:[{$and:[{name:'ASUS'},{RAM:8}]},{$and:[{name:'LenOVO'},{RAM:16}]}]})
.then(data => {
    console.log('Hi???n th??? nh???ng s???n ph???m ASUS c?? 8Gb RAM ho???c LENOVO c?? 16Gb RAM',data);
})
app.listen(PORT)