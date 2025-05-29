const mongoose = require('mongoose');
async function connectDB (){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
        const db = mongoose.connection;
        db.on('connected', () => {
            console.log('MongoDB connection established');
        });
        db.on('error', (error) => {
            console.log(' something is wrong MongoDB connection');
        });
        
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
    }
};
module.exports = connectDB;