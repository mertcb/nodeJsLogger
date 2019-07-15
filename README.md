# NodeJs Logger
 ```
  _   _             _            _  ____   _                                     
 | \ | |  ___    __| |  ___     | |/ ___| | |     ___    __ _   __ _   ___  _ __ 
 |  \| | / _ \  / _` | / _ \ _  | |\___ \ | |    / _ \  / _` | / _` | / _ \| '__|
 | |\  || (_) || (_| ||  __/| |_| | ___) || |___| (_) || (_| || (_| ||  __/| |   
 |_| \_| \___/  \__,_| \___| \___/ |____/ |_____|\___/  \__, | \__, | \___||_|   
                                                        |___/  |___/             
```

This is a simple logger written in nodeJS. With this logger, you can keep the logs of your project and you can log on console or write them on a file. 

## Usage

Firstly you need to import the logger

**If you want to add a file**

```js
var logger = require('./logger')
logger.add('example.txt');
````
**If you want to log on console**

```js
var logger = require('./logger')
logger.add();
````

Then you can log with this code below

```js
logger.warn('this is a warn');
```

```js
logger.info('this is a info');
```

```js
logger.error('this is a error');
```

Lastly, this project is under GNU GPLv3.0. So you can directly contribute and use.

