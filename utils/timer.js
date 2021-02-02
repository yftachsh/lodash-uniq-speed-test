const { performance } = require('perf_hooks');

class Timer {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
    }

    start = () => {
        this.startTime = performance.now();
    }

    end = () => {
        this.endTime = performance.now();
    }

    finalize = () => {
        return (this.endTime - this.startTime).toFixed(3);
    }
}

module.exports = Timer;
