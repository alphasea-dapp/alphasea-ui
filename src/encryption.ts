
import { secretbox } from "tweetnacl";
import { encodeUTF8 } from "tweetnacl-util";
import hexToArrayBuffer from 'hex-to-array-buffer'

export const decryptPrediction = (encryptedContent: string, contentKey: string) => {
    const contentKeyArray = new Uint8Array(hexToArrayBuffer(contentKey.slice(2)));
    const encryptedContentArray = new Uint8Array(hexToArrayBuffer(encryptedContent.slice(2)));
    const nonce = encryptedContentArray.slice(0, secretbox.nonceLength);
    const message = encryptedContentArray.slice(secretbox.nonceLength);
    const decrypted = secretbox.open(message, nonce, contentKeyArray);

    if (decrypted) {
        return encodeUTF8(decrypted);
    }
    return void 0
};

