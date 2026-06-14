const { createClient } = require('@libsql/client');

function getDb() {
  return createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const db = getDb();

  try {
    await db.execute(
      `CREATE TABLE IF NOT EXISTS calendar (id TEXT PRIMARY KEY, data TEXT NOT NULL)`
    );

    if (req.method === 'GET') {
      const result = await db.execute(
        `SELECT data FROM calendar WHERE id = 'main'`
      );
      if (result.rows.length === 0) {
        res.status(200).json({});
        return;
      }
      res.status(200).json(JSON.parse(result.rows[0].data));
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);

      await db.execute({
        sql: `INSERT INTO calendar (id, data) VALUES ('main', ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data`,
        args: [JSON.stringify(body)],
      });

      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
