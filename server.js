const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT||  5002;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {  useUnifiedTopology: true   }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const todoRouter = require('./routes/todos');

app.use('/todos', todoRouter);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'))
}



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});