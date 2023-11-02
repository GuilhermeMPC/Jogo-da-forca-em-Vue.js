const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('meu_banco_de_dados.db');

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

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
