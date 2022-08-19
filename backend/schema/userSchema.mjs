import mongoose from 'mongoose';
const { Schema } = mongoose;

const userData = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
})

export default userData;