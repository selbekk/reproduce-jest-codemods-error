# The story of the missing `withArgs`

To reproduce, clone the repo, run `npm install` and follow these steps:

```
➜  reproduce-jest-codemods-error git:(master) jest-codemods
? Which test library would you like to migrate from? Expect.js (by Automattic)
? Will you be using Jest on Node.js as your test runner? Yes, use the globals provided by Jest (recommended)
? On which files or directory should the codemods be applied? src,test/**/*.js
Executing command: jscodeshift -t /usr/local/lib/node_modules/jest-codemods/dist/transformers/expect-js.js test/some-expect-tests.spec.js
Processing 1 files...
Spawning 1 workers...
Sending 1 files to free worker...
All done.
Results:
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 1.311seconds
```

Note the following diff:

```diff
diff --git a/test/some-expect-tests.spec.js b/test/some-expect-tests.spec.js
index 243df89..fbefa3c 100644
--- a/test/some-expect-tests.spec.js
+++ b/test/some-expect-tests.spec.js
@@ -1,12 +1,10 @@
-import expect from 'expect.js';
-
 const multiply = (a, b) => a * b;

 describe('test suite', () => {
     it('puts 2 and 2 together', () => {
-        expect(multiply(2, 2)).to.be(4);
+        expect(multiply(2, 2)).toBe(4);
     });
     it('throws an error if given non-numbers', () => {
-        expect(() => multiply).withArgs({}, 'not a number').to.throwError();
+        expect(() => multiply).toThrow();
     });
 });
```

This will change the output of the test, since the arguments won't be passed anymore.