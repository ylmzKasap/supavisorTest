module.exports = async function (req, res) {
  const database = req.app.get('database');

  let messages;
  for (let i = 0; i<100; i++) {
    messages = await database.query('SELECT * FROM messages;').then(r => r.rows);
  }

  return res.status(200).json({messages: messages});
}