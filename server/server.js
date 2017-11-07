const path = require('path');         //node tool to configure the PATH to our file locations
const express = require('express');   //node express web server

const publicPath = path.join(__dirname, '../public');  //path to the 'public' folder for any POSIX OS
const port = process.env.PORT || 3000;    //Web Server listening on heroku port or PORT 3000 for local
var app = express();

app.use(express.static(publicPath));    //Point express to the public folder containing index.html






//------------------------------------START SERVER------------------------------------------

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
