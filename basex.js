/*
derived from https://github.com/paulmillr/micro-base58/blob/master/index.js
with small modifications.
*/

function bytesToHex(uint8a)
{
    // pre-caching chars could speed this up 6x.
    hex = '';
    for (let i = 0; i < uint8a.length; i++) {
        hex += uint8a[i].toString(16).padStart(2, '0');
    }
    return hex;
}

function basex_encode(source, alphabet)
{
    // source: string or Uint8Aarray
    // alphabet: string
    // return: string
    if (source.length === 0) return '';
    if (typeof source === 'string') source = new TextEncoder().encode(source);

    // Convert Uint8Array to BigInt, Big Endian.
    let x = BigInt('0x' + bytesToHex(source));
    let output = [];
    const base = BigInt(alphabet.length);
    while (x > 0) {
        const mod = Number(x % base);
        x = x / base;
        output.push(alphabet[mod]);
    }
    for (let i = 0; source[i] === 0; i++) {
        output.push(alphabet[0]);
    }
    return output.reverse().join('');
}

function basex_decode(output, alphabet)
{
    // output: string
    // alphabet: string
    // return: Uint8Array
    if (output.length === 0) return new Uint8Array([]);
    const bytes = [0];
    const base = alphabet.length;
    for (let i = 0; i < output.length; i++) {
        const char = output[i];
        const value = alphabet.indexOf(char);
        if (value === undefined) {
            throw new Error(
                `base58.decode received invalid input. Character '${char}' is not in the base58 alphabet.`
            );
        }
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] *= base;
        }
        bytes[0] += value;
        let carry = 0;
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
        }
        while (carry > 0) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
    }
    for (let i = 0; i < output.length && output[i] === '1'; i++) {
        bytes.push(0);
    }
    return new Uint8Array(bytes.reverse());
}

