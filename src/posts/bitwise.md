---
layout: layouts/blog.webc
tags: post
title: An interesting usecase for bit manipulation
excerpt: I dove into some interesting code that worked with binary number values. I try my best at disecting why it may be useful.
date: 2022-10-08
---

The other day, I was reading the source code to <a href="https://github.com/preactjs/signals" noreferrer target="_blank">preact/signals</a> and came across code that looked somewhat like this:

```javascript
// flags
const FIRSTFLAG = 1 << 0;
const SECONDFLAG = 1 << 1;
const THRIDFLAG = 1 << 2;

// object with flags
const node = {
  flags: 0
}

// adding flags?
node.flags |= FIRSTFLAG;

// checking if flags existed
if (node.flags & (SECONDFLAG | THIRDFLAG)) {
  // do stuff
}

// removing flags?
node.flags &= ~FIRSTFLAG;
```

Event after coding for _~ten_ years, this isn't something I have seen with any regularity. Certainly not enough to know what it did off the top of my head. So what exactly is going on here? Lets break it down.

### Binary
Before we can go any further, we need to discuss how numbers are represented at the binary level. When we talk about binary, data is can only be represented as a series of `1`s and `0`s. For now we will just discuss what that means for numbers in our little javascript example. Lets work with the following:

```
000001
```
This represents the number `1`. It doesn't matter how many zeros precede the `1`, just that it appears in the right most place. Going left each bit/digit represents double the previous digit. So it would go something like: `0001 == 1`, `0010 == 2`, `0100 == 4`, `1000 == 8`, and so on. 

From here you can set the bit in multiple places to get all the numbers:
```
0001    // 1
0010 +  // 2
------
0011    // 3
```

Javascript numbers are 64-bit, so in theory you could have up to `1`s and `0`s, but the way there encoded for floating point precision and postive/negative values, it leaves us with 53 bits of usable information. We can distinguish this by the following:

```javascript
const max_binary = Number.MAX_SAFE_INTEGER.toString(2);
// 11111111111111111111111111111111111111111111111111111

max_binary.length; // 53
```

Javascript technically has <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt" noreferrer target="_blank">big ints</a>, but I'm not there yet. Plus I think we have enough for now.

### Creating flags
Okay, so 53 bits worth of information... for what? We will get there... I promise.

Now that we have some background knowledge, what is going on in the code. It starts by predefining some flags with some interesting syntax, which turns out to be the bitshift operator.
```javascript
const FIRSTFLAG = 1 << 0; // bit shifting left 0 places
```
This changes the number `1` by moving it's bits to the left by `0` places. If we push `001` left by `0`, we still have `1`. 🙄 Okay, that was lame... lets try again. But push it left `1` space:

```javascript
const SECONDFLAG = 1 << 1; // bit shifting left 1 place

SECONDFLAG === 2;
```

We've transformed `001` by pushing the bits to get `010`, and the slot second from the left has the value of `2`.
