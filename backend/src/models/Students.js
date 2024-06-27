const { check } = require("express-validator");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let studentsModel = new Schema({
    image:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    rollNo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        default:'1234'
    },
    college:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true,
    },
    attendedClasses:{
        type:Number,  
        default:0,
        required:true
    },
    totalClasses:{
        type:Number,
        default:0,
        required:true
    },
    presentDays:{
        type:Array,
        default:[]
    },
    courseStartedDate:{
        type:Date,
        default:new Date().getDate()
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'absent',
        required: true
    },

    

    

})
module.exports = mongoose.model("Students", studentsModel);