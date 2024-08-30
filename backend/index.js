const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Create a new todo
app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Invalid input provided!" });
    }

    try {
        const tododata = await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.status(201).json(tododata);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get all incomplete todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find({ completed: false });
        res.json(todos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving todos' });
    }
});

// Mark a todo as completed
app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Invalid input provided!" });
    }

    try {
        await todo.updateOne(
            { _id: req.body.id },
            { completed: true }
        );
        res.json({ msg: "Todo marked as completed!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the todo' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
