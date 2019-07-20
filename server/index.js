//imports
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const logger = require('./middleware/logger');

//middlewares:
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(logger);

//routers
const authRouter = require('./routes/auth');

// use routers
app.use('/api/auth', authRouter);

//run the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));