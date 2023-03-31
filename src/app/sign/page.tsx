"use client";
import { useAccount } from "@/hooks/wallet";
import { wallet } from "@/utils/wallet";
import { SigningType } from "@airgap/beacon-sdk";
import { useEffect } from "react";
import { char2Bytes } from "@taquito/utils";

export default function Sign({ searchParams }) {
  const { account, refetch } = useAccount();

  useEffect(() => {
    async function query() {
      if (account) {
        const formattedInput = `I validate this renter as trusted on Guarantease: ${searchParams.address}`;
        const bytes = char2Bytes(formattedInput);
        const bytesLength = (bytes.length / 2).toString(16);
        const addPadding = `00000000${bytesLength}`;
        const paddedBytesLength = addPadding.slice(addPadding.length - 8);
        const payloadBytes = "05" + "01" + paddedBytesLength + bytes;
        const sig = await wallet.client.requestSignPayload({
          signingType: SigningType.MICHELINE,
          sourceAddress: account.address,
          payload: payloadBytes,
        });
      } else {
        refetch();
      }
    }
    query();
  }, [account]);

  return <div></div>;
}
