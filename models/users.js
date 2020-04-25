const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const user = new mongoose.Schema({
    name: {type:String, required: true},
    userid: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    department:{type:String, required:true}
})

user.statics.create = function (data) {
    const userinfo = new this(data);
    
    return userinfo.save();
}

user.statics.findUser = function (userid, userpw) {
    // 특수기호 $는 쓰지못하게 해야 기초적인 인젝션 방어가 가능함
    return this.findOne({"userid": userid, "password": userpw});
}

user.statics.getUserInfo = function (uid) {
    return this.findOne({"_id":uid});
}

user.statics.deleteUser = function (userid) {
    return this.remove({userid});
}

user.statics.findAll = function () {
    return this.find({});
}

module.exports = mongoose.model('User', user);