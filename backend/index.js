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
app.post('/todos', (req, res) => {
    const { content } = req.body;
    if (!content || content.trim() === "") {
        return res.status(400).json({ message: "content가 비어있습니다" });
    }
    const createdDate = new Date();
    const sql = 'insert into todos (content, isDone, createdDate) values (?, ?, ?)';
    // res.send(data): 클라이언트에게 응답 데이터를 전송하는 함수.
    db.query(sql, [content, false, createdDate], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({id: result.insertId, content, isDone: false, createdDate: new Date()});
    });
});

// 조회
app.get('/todos', (req, res) => {
    const sql = 'select * from todos order by createdDate DESC';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// 수정
app.put('/todos/:id', (req, res) => {
    // :id처럼 URL 경로에 포함된 값 -> req.params
    const { id } = req.params;
    // 요청 본문(body)에 담긴 데이터. 주로 POST, PUT 요청에서 사용용
    const { isDone } = req.body;
    const sql = 'update todos set isDone = ? where id = ?';
    db.query(sql, [isDone, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({id, isDone});
    });
});

// 삭제
app.delete('/todos/:id', (req, res) => {
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