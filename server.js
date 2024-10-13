const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Budget = require('./models/Budget');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/budget-data')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/hello', (req, res) => {
    res.send('Hello World!!');
});

app.get('/budget', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching data from database' });
    }
});

app.post('/add-budget', async (req, res) => {
    const { title, budget, color, borderColor } = req.body;
  
    if (!title || !budget || !color || !borderColor) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const newBudget = new Budget({ title, budget, color, borderColor });
      await newBudget.save();
      res.status(201).json({ message: 'Budget entry added successfully', newBudget });
    } catch (err) {
      res.status(500).json({ error: 'Error adding budget entry' });
    }
});
  

app.listen(port, () => {
    console.log(`Personal Budget app listening at http://localhost:${port}`);
});