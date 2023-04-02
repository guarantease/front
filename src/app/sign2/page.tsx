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
        const formattedInput = `tz1LunH1MzRTpMx6HoWxnmpburbSNaxHCumV100000000000000000000`;
        const bytes =
          char2Bytes("tz1hmG8ChqnJSH4pkZMeHMp3Q4Rm7inBEFCH") +
          "8AC7230489E80000" +
          "25C3F80";
        console.log(bytes);
        const sig = await wallet.client.requestSignPayload({
          signingType: SigningType.RAW,
          payload: formattedInput,
        });
        console.log(sig.signature, account.publicKey);
      } else {
        refetch();
      }
    }
    query();
  }, [account]);

  return <div></div>;
}
