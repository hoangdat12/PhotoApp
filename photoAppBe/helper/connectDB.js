import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Mongoose Connected!')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB