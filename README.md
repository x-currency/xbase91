# Xbase91: Most Efficient JSON Friendly Byte Encoder
JavaScript Base91 Encoding Implementation using a JSON Friendly alphabet (no backward slash and quotes) 

### Usage
```
import {encode,decode,decodeStr} from '@x-currency/xbase91';

// .encode accepts both bytes (Uint8Array) and string
console.log( 'encode', encode( Uint8Array.from([0,1,2]) ) ); // :CQA
console.log( 'encode' ,encode( 'Hello World!') ); // >OwJh>Io0Tv!8PE

// .decode output bytes (Uint8Array) 
console.log( 'decode', decode(':CQA') ); // Uint8Array(3) [ 0,1,2 ]

// .decodeStr output string 
console.log( 'decodeStr', decodeStr('>OwJh>Io0Tv!8PE') ); // Hello World!
```

#### Usage in ES5
```
const { encode, decode, decodeStr } = require('@x-currency/xbase91');
// same as above
```

### Install
```
npm install @x-currency/xbase91 --save
```

### Test
```
node test/example.js
```

### X Currency?
https://www.reddit.com/r/xcurrencyecosystem

