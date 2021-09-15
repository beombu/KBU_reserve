const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {type:String, required: true},
        username :{ type: String, required: true, unique:true},
        hashedPassword :{ type:String, required:true},
        email : {type:String, required:true, unique: true},
        phoneNumber : {type:String, required:true, unique: true},
        kbuCode : {type:String, required:true, unique: true},

        sessions:[
            {
                createdAt :{ type: Date, required:true},
            }
        ]
    },
    {timestamps:true}
);

module.exports = mongoose.model("user", UserSchema);