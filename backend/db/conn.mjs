import mongoose from "mongoose";
const uri = "mongodb://localhost:27017/UserDB"
mongoose.connect(uri, () => {
    console.log("Connected to mongo successfully!")
})