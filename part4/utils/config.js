require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB_URI;

module.exports = {
    PORT,
    MONGODB
};
