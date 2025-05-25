const express = require('express');
require('dotenv').config();
const sequelize = require('./config/DBConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


const mainRoutes = require('./routes/main.routes');

app.use(express.json());
app.use(cors());


app.use('/', mainRoutes);

sequelize.sync({ force: false }) // change to true to reset DB
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch(err => {
        console.error('Failed to sync DB:', err);
    });

