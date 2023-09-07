# Zefyr

Configurable and typesafe monkey patching for TypeScript.

```typescript
import 'zefyr/patches';

// blueAndGreen :: ['green', 'blue']
const blueAndGreen = words('red green blue').without('red');
console.log(blueAndGreen); // ['green', 'blue']

new Date().format('yyyy-MM-dd'); // => '2023-09-01'
((3).days + (2).hours).ago() // => Date(2023-08-29T21:00:00.000Z)

const arr = [1, 2, true, 'a'] as const;
arr.last(); // => 'a'. Also inferred as exactly 'a' in TypeScript
const wrongResult = [1, 2, false].sum(); // Throws an error at runtime. wrongResult :: never
const rightResult = [1, 2, 3].sum(); // => 6. rightResult :: number

const arr2 = [1, 2, undefined, 4, null, undefined]; // arr2 :: (number | null | undefined)[]
const arr3 = arr2.compact(); // arr3 :: number[]

(54321).digits[0]; // => 1
(54321).digits(7)[1]; // => 6 (in 7-base)
-10.5.isPositive(); // => false

const obj = { a: 1, b: 2 };
const keys = Object.strictKeys(obj);
for (const key of keys) {
  console.log(obj[key]); // No type error in TypeScript
}

'hello'.reverse(); // => 'olleh'
const light = 'red' as 'red' | 'green' | 'blue' | '';
if (light.isNotEmpty()) {
  const light2 = light; // light2 :: 'red' | 'green' | 'blue'
  // ...
}

for (const n of range(3)) {
  console.log(n); // 0, 1, 2
}
```

**Note:** Zefyr requires TypeScript 5.0 or above and ES2020 or later. Currently, only ES Modules are supported.

## Installation

### npm

```bash
npm install zefyr
```

### yarn

```bash
yarn add zefyr
```

### pnpm

```bash
pnpm add zefyr
```

## Usage

The simplest way to start using Zefyr is to import `zefyr/patches` in your project. It would automatically patch the global objects and prototypes, so you can use the extensions directly.

All patches are well-typed in TypeScript, as well as well-documented, you can explore them in your editor or IDE just like the built-in ones.

```typescript
import 'zefyr/patches';
```

All patches are optional, you can import only the patches you need.

```typescript
import 'zefyr/patches/Array'; // Import patches for Array
import 'zefyr/patches/Number'; // Import patches for Number
import 'zefyr/patches/Date/format'; // Import patches for only Date#format
```

If you dislike the Monkey Patching pattern, you can also import the patches as functions.

```typescript
import { sum } from 'zefyr/Array'; // Note that `patches` is not included in the path
import isNegative from 'zefyr/Number/isNegative';
```

Zefyr exports a `patch` function for easy patching. You can create your own patches using it.

```typescript
import { patch } from 'zefyr';

// Declarations are required to ensure type safety
declare global {
  interface Number {
    double(): number;
  }

  function hello(): void;
}

patch(Number).with({ double: (n) => n * 2 });
patch(globalThis).withStatic({ hello: () => console.log('Hello, world!') });

console.log((42).double()); // => 84
hello(); // => 'Hello, world!'
```
