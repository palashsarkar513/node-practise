const mongoose = require("mongoose");

const Consumer = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    quantity : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum :["active","inactive"]
    }
});

// Schema methods

/*Consumer.methods = {
    findActive : function(){
        const data = mongoose.model("Consumer").find({status : "inactive"});
        return data;
    }
}*/

// Schema static

/*Consumer.statics = {
   findActive : function(){
    const data = this.find({name :/pran/i});
    return data;
   }
}*/

// query helpers

/*Consumer.query = {
    findByName : function (name){
        const data = this.find({status : new RegExp(name,"i")});
        return data;
    }
}*/

// methods
Consumer.query = {
    findByName : function (name){
        const data = this.find({name : new RegExp(name,"i")});
        return data;
    }
};



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

userSchema.query = {
    findByName : function (name){
        const data = this.find({userName : new RegExp(name,"i")});
        return data;
    },
    // hasData : function(username){
    //     const data = this.find({userName : new RegExp(username,"i")});
    //     return data;
    // }

    hasData : function(userName){
        const data = this.find({userName:new RegExp(userName,"i")});
        return data
    }
}


module.exports = {Consumer,userSchema};
