const colors = require('colors');

class Logger {
    constructor() {
        this.styles = {
            successFinal: colors.rainbow,
            success: colors.green,
            error: colors.red,
            info: colors.dim,
        }
    }

    log = (message, severity) => {
        console.log(
            `[${this.timestamp()}]`,
            this.styles[severity](
                `${message}`
            )
        );
    }

    timestamp = () => {
        const current = new Date();

        const hours = current.getHours().toString().length > 1
        ? current.getHours().toString()
        : `0${current.getHours().toString()}`;

        const minutes = current.getMinutes().toString().length > 1
        ? current.getMinutes().toString()
        : `0${current.getMinutes().toString()}`;

        const seconds = current.getSeconds().toString().length > 1
        ? current.getSeconds().toString()
        : `0${current.getSeconds().toString()}`;

        const milliseconds = current.getMilliseconds().toFixed(3).toString().length > 1
        ? current.getMilliseconds().toString()
        : `0${current.getMilliseconds().toString()}`;

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    success = message => {
        this.log(message, 'success');
    }

    error = message => {
        this.log(message, 'error');
    }

    info = message => {
        this.log(message, 'info');
    }

    successFinal = message => {
        this.log(message, 'successFinal');
    }
}

module.exports = Logger;
