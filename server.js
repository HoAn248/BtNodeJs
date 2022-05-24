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
        lowercase: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Invalid email')
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        // validate(value) {
        //     if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        //         throw new Error('Mật khẩu phải bao gồm ít nhát 1 chữ cái và 1 chữ số')
        //     }
        // },
        private: true
    }

},
    {
        collection: 'UserSchema'
    })
const UserSchema = mongoose.model('UserSchema', userSchema)
UserSchema.find({})
// UserSchema.create({
//     username: 'An',
//     email: 'hda24082002@gmail.com',
//     password: 'ducAnho123~'
// })
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
// Product.create({
//     name:"ASUS",
//     RAM: 8,
//     maxRAM: 8
// })
// Product.find({})
// .then(data =>{
//     console.log(data);
// })
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
// Receipts.create({
//     payInMethod: 'credit card',
// })

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
//     firstName: "Vân",
//     lastName: "Hồ",
//     gender: 'male',
//     age: 23,
//     boughtProductId: ['lenovo','asus','hp','dell'],
//     phoneNumber: 'van52809@donga.edu.vn'
// })

// lấy > 20 tuổi
Buyer.find({age:{$gt:20}})
.then(data => {
    console.log('lấy > 20 tuổi', data);
})

// lấy >= 23 tuổi
Buyer.find({age:{$gte:23}})
.then(data => {
    console.log('lấy >= 23 tuổi', data);
})

// <= 20
Buyer.find({age:{$lte:20}})
.then(data => {
    console.log('<= 20', data);
})

// 20 hoặc 30
Buyer.find({$or:[{age:20},{age:30}]})
.then(data => {
    console.log('20 hoặc 30',data);
})

// email đuôi donga.edu.vn
Buyer.find({email:/donga.edu.vn/})
.then(data => {
    console.log('email đuôi donga.edu.vn',data);
})


// tên văn hoặc vân
Buyer.find({$or:[{firstName:'Văn'},{firstName:'Vân'}]})
.then(data => {
    console.log('tên văn hoặc vân',data);
})

// Ngọc nam
Buyer.find({$and:[{firstName:'Ngọc'},{gender:'male'}]})
.then(data => {
    console.log('tên Ngọc giới tính nam',data);
})

// thiếu trường number
Buyer.find({phoneNumber:null})
.then(data => {
    console.log('thiếu trường number',data);
})


// thiếu trường email
Buyer.find({email:null})
.then(data => {
    console.log('thiếu trường email',data);
})

// có số điện thoại bắt đầu với 034
Buyer.find({phoneNumber:/^034/})
.then(data => {
    console.log('ó số điện thoại bắt đầu với 034',data);
})

//Hiển thị những buyer mua trên 3 món hàng.
Buyer.find({ "boughtProductId.3":{ "$exists": true }})
.then(data => {
    console.log('Hiển thị những buyer mua trên 3 món hàng.',data);
})

//Hiển thị những sản phẩm máy tính có RAM là 8Gb và không thể nâng cấp thêm. 
Product.find({})
.then(data => {
    console.log('Hiển thị những sản phẩm máy tính có RAM là 8Gb và không thể nâng cấp thêm. ');
    data.forEach(e=>{
        if(e.maxRAM - e.RAM === 0 ){
            console.log(e);
        }
    })
})
// Hiển thị những hóa đơn được tạo trước ngày hôm qua
Receipts.find({})
.then(data => {
    console.log('Hiển thị những hóa đơn được tạo trước ngày hôm qua');
    let date = new Date()
    data.forEach(e=>{
        let timeData = e.createdAt
        let result = date.getTime() - 1440000
        if(timeData.getTime() < result){
            console.log(e);
        }
    })
})
app.listen(PORT)