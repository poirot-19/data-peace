const express=require ('express');
const bodyParser=require('body-parser');

const port=3000;
const app=express();
const api=require('./routes/api.js');


app.use(bodyParser.json());
app.use('/api',api);

app.listen(port,function(){
  console.log('listening on port '+port);
});
