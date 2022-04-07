import './setup'; // Must be the first import
import app from './server';
import logger from './shared/logger';


// Start the server
const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});
