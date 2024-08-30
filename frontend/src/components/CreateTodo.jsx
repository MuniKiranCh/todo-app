import React, { useState, useEffect } from 'react';
import Todos from './Todos';

const CreateTodo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then(async (res) => {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    console.error("Expected an array, but received:", data);
                }
            })
            .catch((err) => console.error("Failed to fetch todos:", err));
    }, []);

    return (
        <div>
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder='title'
                value={title}  // Bind value to the state
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
                style={{ padding: 10, margin: 10 }}
                type="text"
                placeholder='description'
                value={description}  // Bind value to the state
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <button
                style={{ padding: 10, margin: 10 }}
                onClick={() => {
                    fetch('http://localhost:3000/todo', {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            description: description,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                        .then(async (res) => {
                            const newTodo = await res.json();
                            setTodos([...todos, newTodo]);
                            setTitle("");
                            setDescription("");
                        })
                        .catch((err) => console.error("Failed to add todo:", err));
                }}>
                Add Todo
            </button>
            <Todos todos={todos} />
        </div>
    );
};

export default CreateTodo;
