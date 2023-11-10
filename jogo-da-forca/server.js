const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('jogo-da-forca.db');

app.use(cors());

app.get('/palavras', (req, res) => {
    db.all('SELECT * FROM palavras', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para buscar palavra aleatória
app.get('/palavra-aleatoria', (req, res) => {
    db.get('SELECT Palavra FROM palavras ORDER BY RANDOM() LIMIT 1', (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row.Palavra);
    });
  });

app.get('/palavra-com-categoria', (req, res) => {
  const word = req.query.word; // Obter o parâmetro 'word' da requisição

  db.get(`SELECT Palavra FROM palavras WHERE Categoria = ? ORDER BY RANDOM() LIMIT 1`, [word], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(row.Palavra);
    } else {
      res.status(404).json({ error: 'Nenhuma palavra encontrada para a categoria especificada' });
    }
  });
});
  

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
