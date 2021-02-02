const colors = require('colors');

class Logger {
    constructor() {
        this.styles = {
            successFinal: colors.rainbow,
            success: colors.green,
            error: colors.red,
            info: colors.blue
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
        return `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}.${current.getMilliseconds()}`;
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
