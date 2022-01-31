
import { secretbox } from "tweetnacl";
import { encodeUTF8 } from "tweetnacl-util";

const hexToUint8Array = (x: string) => {
    x = x.toLowerCase()
    if (x.slice(0, 2) == '0x') {
        x = x.slice(2)
    }
    const y = []
    for (let i = 0; i < x.length / 2; i++) {
        y[i] = parseInt(x.slice(2 * i, 2 * (i + 1)), 16)
    }
    return new Uint8Array(y);
}

export const decryptPrediction = (encryptedContent: string, contentKey: string) => {
    if (!contentKey) return void 0;

    const contentKeyArray = hexToUint8Array(contentKey);
    const encryptedContentArray = hexToUint8Array(encryptedContent);
    const nonce = encryptedContentArray.slice(0, secretbox.nonceLength);
    const message = encryptedContentArray.slice(secretbox.nonceLength);
    const decrypted = secretbox.open(message, nonce, contentKeyArray);

    if (decrypted) {
        return encodeUTF8(decrypted);
    }
    return void 0
};

