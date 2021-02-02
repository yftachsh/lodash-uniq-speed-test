# lodash-uniq-speed-test
A comparison between multiple uses of lodash's "uniqWith" method and a custom solution

## Report results for an array of 500,000 elements:

```
* Lodash's uniqWith method with equality condition                  ↪ 235.867ms
* Lodash's uniqWith method with iterative comparison                ↪ 5522.251ms
* Lodash's uniqWith method with the default comparator              ↪ 14.469ms
* Custom unique method that uses mapping, Set and JSON operations   ↪ 1444.138ms
```
