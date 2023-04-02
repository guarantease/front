"use client";

import { useAccount } from "@/hooks/wallet";
import { wallet } from "@/utils/wallet";
import { NetworkType } from "@airgap/beacon-sdk";
import { useCallback } from "react";

export const Wallet = () => {
  const queryPerms = useCallback(async () => {
    try {
      const permissions = await wallet.client.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const { account, refetch } = useAccount();

  return !account ? (
    <button
      className="flex items-center gap-3 py-2 px-3 bg-dark rounded-xl capitalize font-medium cursor-pointer text-white"
      onClick={queryPerms}
    >
      Connect Wallet
    </button>
  ) : (
    <div
      className="flex items-center gap-3 py-2 px-3 bg-dark rounded-xl lowercase cursor-pointer"
      onClick={() => {
        wallet.clearActiveAccount();
        refetch();
      }}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
      <p className="text-white font-medium">
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </p>
    </div>
  );
};

export default Wallet;
