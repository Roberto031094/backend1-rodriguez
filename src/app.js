import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { uploader } from './utils.js';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicPath = path.join(__dirname, 'public');

console.log(publicPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(express.json());

app.post('/upload', uploader.single('archivo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
    }
    res.status(200).json({ message: 'Archivo subido con éxito', file: req.file });
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error('Error del servidor:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
