/*
  __  __              _         _     
 |  \/  |  ___  _ __ | |_  ___ | |__  
 | |\/| | / _ \| '__|| __|/ __|| '_ \ 
 | |  | ||  __/| |   | |_| (__ | |_) |
 |_|  |_| \___||_|    \__|\___||_.__/ 
                                      
*/
const path = require('path');
const system = require('util');
const fs = require('fs');

var createLogArray = function (logs) {
    return Array.prototype.slice.call(logs);
};

var Logger = function (logPath) {
    this.write = console.log;
    this.logLevel = 2;
    try {
        logPath = path.normalize(logPath);
        this.stream = fs.createWriteStream(logPath, { flags: 'a', encoding: 'utf8', mode: 0666 });
        this.stream.write("\n");
        this.write = function (message) {
            this.stream.write(message);
        }
    } catch{
        console.log('dosya olusturulurken bir hata olustu')
    }
}

Logger.levels = ['error', 'warn', 'info'];

Logger.prototype.format = function (logLevel, logDate, message) {
    return [logLevel, logDate, message].join(' ');
}

Logger.prototype.setLevel = function (level) {
    var level = Logger.levels.indexOf(levelToSet);
    if (level != -1) {
        return logLevel = levelToSet;
    } else {
        return false;
    }
}

Logger.prototype.log = function () {
    var logArgs = createLogArray(arguments);
    var logIndex = Logger.levels.indexOf(logArgs[0]);
    var message = ' ';

    if (logIndex === -1) {
        logIndex = this.logLevel;
    } else {
        logArgs.shift();
    }
    if (logIndex <= this.logLevel) {
        logArgs.forEach(function (arguments) {
            if (typeof arguments === 'string') {
                message += ' ' + arguments;
            } else {
                message += ' ' + system.inspect(arguments, false, null);
            }
        });
        var today = new Date();
        var time = today.getHours(3) + ":" + today.getMinutes() + ":" + today.getSeconds()
        message = this.format(Logger.levels[logIndex], time, message);
        this.write(message + "\n");
        return message;
    }
    return false;
}

Logger.levels.forEach(function(level) {
    Logger.prototype[level] = function() {
      var args = createLogArray(arguments);
      args.unshift(level);
      return this.log.apply(this, args);
    };
  });

exports.Logger = Logger;
exports.add = function (logPath) {
    return new Logger(logPath);
};
