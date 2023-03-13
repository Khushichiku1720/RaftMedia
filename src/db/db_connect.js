const mongoose=require('mongoose')
 
const mongoURI="mongodb://0.0.0.0:27017"
 
connectToMongo = () =>{
   mongoose.connect(mongoURI, {useNewUrlParser: true, dbName: 'RaftMedia' },() =>{
       console.log("Connection Success");
   })
}
 
module.exports=connectToMongo;