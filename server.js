require('dotenv').config();
const pg = require('pg')
const development_db = require('./development_database');
const start_app = require('./app');

const isProduction = process.env.NODE_ENV === 'production';

// Initalize database 
let database;
if (isProduction) {
  database = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  database = new pg.Pool({
    connectionString: development_db,
  });
}

const server = start_app(database);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));
