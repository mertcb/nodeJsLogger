var logger = require('./logger').createLog('example.txt');
logger.info('this is an info message');
logger.error('this is an error message')
logger.warn('this is an warn message')