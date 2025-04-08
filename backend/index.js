import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'tododb',
});

db.connect(err => {
    if (err) {
        console.log(`MySql 연결 실패: ${err}`);
        return;
    }
    console.log('MySql 연결 성공!');
});

// 추가
app.post('/api/todos', (req, res) => {
    const { content } = req.body;
    if (!content || content.trim() === "") {
        return res.status(400).json({ message: "content가 비어있습니다" });
    }
    const createdDate = new Date();
    const sql = 'insert into todos (content, isDone, createdDate) values (?, ?, ?)';
    db.query(sql, [content, false, createdDate], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({id: result.insertId, content, isDone: false, createdDate: new Date()});
    });
});

// 조회
app.get('/api/todos', (req, res) => {
    db.query('select * from todos', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// 수정
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { isDone } = req.body;
    const sql = 'update todos set isDone = ? where id = ?';
    db.query(sql, [isDone, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({id, isDone});
    });
});

// 삭제
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'delete from todos where id = ?';
    db.query(sql, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ id });
    });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행중..`);
});