const express = require("express");
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./Config/dbconnection');
const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')


const app = express();
app.use(express.json());
app.use(cors());
// app.use('/uploads', express.static('uploads'));

//routes
app.use("/api",authRoutes);
app.use("/api",itemRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server started on port :${PORT}`);
});
connectDB()