import { Campaign, Renter, Verifier } from "@prisma/client";
import { char2Bytes, verifySignature } from "@taquito/utils";

export const getVerifier = (campaign: Campaign & {Renter: Renter & {verifier: Verifier}}) => {
    const formattedInput = `I validate this renter as trusted on Guarantease: ${campaign.renterAddress}`;
    const bytes = char2Bytes(formattedInput);
    const bytesLength = (bytes.length / 2).toString(16);
    const addPadding = `00000000${bytesLength}`;
    const paddedBytesLength = addPadding.slice(addPadding.length - 8);
    const payloadBytes = "05" + "01" + paddedBytesLength + bytes;
    const isValidSig = verifySignature(payloadBytes, campaign.Renter.verifierPublicKey, campaign.Renter.verificationSignature);
    if(isValidSig) {
        return campaign.Renter.verifier.name
    }
    return 'Invalid'
}