## DEBUGGING REPORT


## Bug 1: api.js never await the fecth calls or used PROMISE.ALL. correctly

# FILE: JS/api.js

## original code failed: because: fetch() returns a Promise, so without await the code was working with pending Promises instead of actual Response objects.
## Pomise.all() also needs an array of Promises as a single arguments, not  two seperate arguments. the .ok check used || instead of negated conditions, so it only threw an error when a response was successsfull, which is the opposite of the intended behaviour.Finally .json was called without parentheses, so it referenced the methods itself instead of calling it and awaiting its result.

## Tests: Ran the app in bowser, clicked Load Lineup, and confirmed in the console that no errors were thrown and the returned data object had the correct artists and performances arrays with real data.


## BuG2 Artits.js constructor, assigned properties to the wrong parameters.
# files:Artist.js

## The original failed because. Every property was assigned to the wrong constructor parameter. It means every artit object had scrambled data, which broke anything relying on artist propeties later, like the performance cards and the search filter.

## tests: After loading the lineup, opened a perfomance card and confirmed the artist name, country, and genre displayed matched the values in artists.json

## BUG3: PerformanceCard.js setter --> inifinite recursion
# File: PerformanceCard.js

# The original failed because Assingning this.performance calls the setter again, creating infinite recursion that would crash the browser tab. Also, this.render referenced the method without calling it.

## Test: Loaded the lineup and confirmed cards rendered without the browser freezing or throwing a "Maximum call stack size exceded" error, and that each card displayed the correct perofrmance data.

