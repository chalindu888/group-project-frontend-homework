import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors()); // Frontend එකෙන් එන requests allow කිරීමට (CORS fix)
app.use(express.json()); // Request body එකේ JSON parse කරගැනීමට

// Model Structure (Data Type)
interface Item {
  id: number;
  name: string;
}

// Temporary In-Memory Database (දත්ත තාවකාලිකව තබා ගැනීමට)
let items: Item[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// 1. READ ALL (GET)
app.get('/items', (req: Request, res: Response) => {
  res.status(200).json(items);
});

// 2. CREATE (POST)
app.post('/items', (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newItem: Item = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// 3. UPDATE (PUT)
app.put('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const itemIndex = items.findIndex(i => i.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items[itemIndex].name = name;
  res.status(200).json(items[itemIndex]);
});

// 4. DELETE (DELETE)
app.delete('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  items = items.filter(i => i.id !== id);
  res.status(200).json({ message: 'Item deleted successfully' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
});