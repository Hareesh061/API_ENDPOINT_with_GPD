const express = require('express');
const app = express();

app.use(express.json());

// Sample data to store resources
const data = {};

// GET method to retrieve a resource
app.get('/resource/:resourceId', (req, res) => {
  const resourceId = req.params.resourceId;
  if (data[resourceId]) {
    res.json(data[resourceId]);
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

// POST method to create a new resource
app.post('/resource', (req, res) => {
  const newResource = req.body;
  const resourceId = newResource.id;
  data[resourceId] = newResource;
  res.status(201).send('Resource created');
});

// DELETE method to delete a resource
app.delete('/resource/:resourceId', (req, res) => {
  const resourceId = req.params.resourceId;
  if (data[resourceId]) {
    delete data[resourceId];
    res.status(204).send('Resource deleted');
  } else {
    res.status(404).json({ message: 'Resource not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
