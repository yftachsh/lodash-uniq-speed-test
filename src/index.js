const axios = require('axios');
const { uniqWith } = require('lodash');
const unique = require('./unique');

// Utils
const Logger = require('../utils/logger');
const Timer = require('../utils/timer');

const lodashUniqWithStraightCmp = array =>
    uniqWith(array, (first, second) =>
        first.postId === second.postId
        && first.id === second.id
        && first.name === second.name
        && first.email === second.email
        && first.body === second.body
    );


const lodashUniqWithIterateCmp = array =>
    uniqWith(array, (first, second) =>
        Object.keys(first)
            .every(key => first[key] === second[key])
    )


const lodashUniqWithClean = array =>
    uniqWith(array);


const customUnique = array =>
    unique(array);


const seperator = () =>
    console.log('-'.repeat(80));

/**
 * Report results for an array of 500,000 elements:
 * 
 * Lodash's uniqWith method with equality condition                 => 235.867ms
 * Lodash's uniqWith method with iterative comparison               => 5522.251ms
 * Lodash's uniqWith method with the default comparator             => 14.469ms
 * Custom unique method that uses mapping, Set and JSON operations  => 1444.138ms
 * 
 */
(async () => {
    seperator();
    const logger = new Logger();
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    logger.info(`Retrieved ${response.data.length} elements from mock API`);
    const testData = new Array(1000).fill(0).reduce(array => [...array, ...response.data], []);

    const tests = {
        lodashUniqWithStraightCmp: () => lodashUniqWithStraightCmp(testData),
        lodashUniqWithIterateCmp: () => lodashUniqWithIterateCmp(testData),
        lodashUniqWithClean: () => lodashUniqWithClean(testData),
        customUnique: () => customUnique(testData),
    }

    logger.info(`Running methods over a mock array of ${testData.length} elements.`);

    const testMethodNames = Object.keys(tests);

    seperator();

    testMethodNames.forEach(testMethodName => {
        testMethod = tests[testMethodName];

        const timer = new Timer();

        try {
            logger.info(`running ${testMethodName}`)
            timer.start();
            const result = testMethod();
            if (
                (!Array.isArray(result)) ||
                (Array.isArray(result) && result.length !== response.data.length)
            ) {
                throw new Error(`Method ${testMethodName} did not successfully execute the operation.`);
            }
            logger.success(`${testMethodName} successfully finished`);
            return true;
        } catch (error) {
            logger.error(`${testMethodName} failed`)
            return false;
        } finally {
            timer.end();
            logger.info(`${testMethodName} ran for ${timer.finalize()} milliseconds`);
            seperator();
        }
    });

    logger.successFinal('All tests finished successfully!');
})();
