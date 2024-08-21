// models/Todo.js
import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  todoId:{
    type: mongoose.Schema.Types.ObjectId,
  } , 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo
