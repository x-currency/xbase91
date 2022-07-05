import {encode,decode,decodeStr} from '../src/xbase91.js';

// .encode accepts both bytes (Uint8Array) and string
console.log( 'encode', encode( Uint8Array.from([0,1,2]) ) );
console.log( 'encode' ,encode( 'Hello World!') );

// .decode output bytes (Uint8Array) 
console.log( 'decode', decode(':CQA') ); // Uint8Array(3) [ 0,1,2 ]

// .decodeStr output string 
console.log( 'decodeStr', decodeStr('>OwJh>Io0Tv!8PE') ); // Hello World!

