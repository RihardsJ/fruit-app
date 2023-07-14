'use strict';

import 'dotenv/config';
import app from './server';
import configs from './config';

const { PORT } = configs;

app.listen(PORT, () => {
  console.log(` server is running on http://localhost:${PORT} `);
});
