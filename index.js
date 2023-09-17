const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const fileUpload = require('express-fileupload');


//allows lenient querying
mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://pdhakal906:moles900@cluster0.mp5chzg.mongodb.net/Emart').then((result) => {
  app.listen(5000);
}).catch((err) => {
  console.log(err)
})

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}));

app.use('/uploads', express.static('uploads'))
app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);




//If no previous route handles a request, this middleware sends a JSON response with a "not found" message and a 404 status code.
app.use((req, res) => {
  return res.status(404).json({
    message: 'Not found'
  })
})