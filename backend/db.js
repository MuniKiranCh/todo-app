const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/todos_application')
.then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log(`Unable to connect to MongoDB: ${error}`);
});

const todoSchema=mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo=mongoose.model('todos',todoSchema);

module.exports={
    todo:todo
}