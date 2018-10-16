const express = require('express');
var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.listen(9000, () => console.log('express server is running at port number 9000.'));