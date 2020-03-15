module.exports = {
    toUint8Array (str) {
        str = unescape(encodeURIComponent(str));
        var buffer = new Uint8Array(str.length);
        for (var i = 0; i < buffer.length; i++) {
            buffer[i] = str[i].charCodeAt(0);
        }
        return buffer;
    },
    fromUint8Array (buffer) {
        var encodedString = String.fromCharCode.apply(null, buffer);
        var decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }
}