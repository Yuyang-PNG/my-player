const fs = require('fs');
const path = require('path');
const DATA = path.join(__dirname, 'data.jsonl');
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'GET') {
    const vid = req.query.vid || 'default';
    const rows = fs.existsSync(DATA) ? fs.readFileSync(DATA, 'utf8').split('\n').filter(Boolean) : [];
    const list = rows.map(r => JSON.parse(r)).filter(r => r.vid === vid);
    return res.json(list);
  }
  if (req.method === 'POST') {
    const body = req.body;
    const line = JSON.stringify({ ...body, id: Math.random().toString(36), ts: Date.now() }) + '\n';
    fs.appendFileSync(DATA, line);
    return res.json({ ok: true });
  }
  res.status(405).end();
};
