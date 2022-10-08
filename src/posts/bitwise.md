---
layout: layouts/blog.liquid
tags: post
title: An interesting usecase for bit manipulation
excerpt: I dove into some interesting code that worked with binary number values. I try my best at disecting why it may be useful.
date: 2022-10-08
---

The other day, I was reading the source code to [preact/signals](https://github.com/preactjs/signals) and came across code that looked somewhat like this:

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
Before we can go any further, we need to discuss how numbers function at the binary level. Binary is a series of `1`s and `0`s that have meaning when put together in certain ways. For now we will just discuss what that means for numbers in our little javascript example. Lets work with the following:

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

### Creating flags
It starts by predefining some flags with some interesting syntax, which turns out to be the bitshift operator.
```javascript
const FLAG = 1 << 0; // bit shifting left 0 places
```
