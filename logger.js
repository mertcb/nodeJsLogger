/*
author: mertcb / mert@bilgic.me
*/
const path = require('path');
const util = require('util');
const fs = require('fs');

const Logger = function (logPath) {
    this.write = console.log;
    this.logTypeLevel = 2;
    if (logPath) {
        try {
            logPath = path.normalize(logPath);
            this.stream = fs.createWriteStream(logPath, {encoding: 'utf8'});
            this.stream.write("\n");
            this.write = function (message) {
                this.stream.write(message);
            }
        } catch{
            console.log('dosya olusturulurken bir hata olustu')
        }
    }
}
Logger.logType = ['error', 'warn', 'info'];

Logger.prototype = {
    format: function (logTypeLevel, logTime, message) {
        return [logTypeLevel, logTime, message].join(' ');
    },
    setLogType: function (TypeToSet) {
        var type = Logger.logType.indexOf(TypeToSet);
        // If the parameter isn't in array, level will be -1. 
        if (type != -1) {
            return logTypeLevel = TypeToSet;
        } else {
            return 'This level is not in array';
        }
    },
    log: function () {
        var logArgs = Array.from(arguments)
        var logIndex = Logger.logType.indexOf(logArgs[0]);
        var message = ' ';
        if (logIndex === -1) {
            logIndex = this.logTypeLevel;
        } else {
            logArgs.shift();
        }
        if (logIndex <= this.logTypeLevel) {
            logArgs.forEach(function (arguments) {
                if (typeof arguments === 'string') {
                    message += ' ' + arguments;
                } else {
                    message += ' ' + util.inspect(arguments, false, null);
                }
            });
            var today = new Date();
            var time = today.getHours(3) + ":" + today.getMinutes() + ":" + today.getSeconds()
            message = this.format(Logger.logType[logIndex], time, message);
            this.write(message + "\n");
            return message;
        }
        return false;
}
}
Logger.logType.forEach(function (logType) {
    Logger.prototype[logType] = function () {
        var args = Array.from(arguments) // Used arguments here because we want to use all log types.
        args.unshift(logType);
        return this.log.apply(this, args);
    };
});

exports.createLog = function (logPath) {
    return new Logger(logPath);
};
