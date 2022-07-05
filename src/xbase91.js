const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~'";

export function encode(dataOrString) {
  let numbers=[];
  let data = null;
  if (typeof dataOrString == 'string') {
    	for(let i =0;i<dataOrString.length;i++) {
          numbers.push(dataOrString.charCodeAt(i)); // chars to u8 aray
        }
    	data = Uint8Array.from(numbers);
  } else { 
    	data = dataOrString; // u8 array
  }  

  let ret = '';
  let n = 0;
  let b = 0;
  for (let i = 0; i < data.length; i++) {
    b |= data[i] << n;
    n += 8;
    if (n > 13) {
      let v = b & 8191;
      if (v > 88) {
        b >>= 13;
        n -= 13;
      } else {
        v = b & 16383;
        b >>= 14;
        n -= 14;
      }
      ret += alphabet[v % 91] + alphabet[v / 91 | 0];
    }
  }

  if (n) {
    ret += alphabet[b % 91];
    if (n > 7 || b > 90) ret += alphabet[b / 91 | 0];
  }

  return ret;
};

export function decodeStr(string) {
  	let decoded = decode(string);
  	return byteArrayToUtf8(decoded);
}

export function decode(data) {
  const raw = '' + (data || '');
  const len = raw.length;
  const ret = [];
  let b = 0;
  let n = 0;
  let v = -1;
  for (let i = 0; i < len; i++) {
    const p = alphabet.indexOf(raw[i]);
    if (p === -1) continue;
    if (v < 0) {
      v = p;
    } else {
      v += p * 91;
      b |= v << n;
      n += (v & 8191) > 88 ? 13 : 14;
      do {
        ret.push(b & 0xff);
        b >>= 8;
        n -= 8;
      } while (n > 7);
      v = -1;
    }
  }

  if (v > -1) {
    ret.push((b | v << n) & 0xff);
  }
  return Uint8Array.from(ret);
};

// used in decryptStr to transform bytes to UT8 string
function byteArrayToUtf8(byteArray) {
 	let str = '';
  	byteArray.forEach((item) =>  {
      	str += String.fromCharCode(item);
    });
	return str;
}

