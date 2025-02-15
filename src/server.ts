/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;

async function main() {
  await mongoose.connect(config.database_url as string);
  server = app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
}

main();

