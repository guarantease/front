"use client";

import { wallet } from "@/utils/wallet";
import { AccountInfo, TezosOperationType } from "@airgap/beacon-sdk";
import { useEffect, useState } from "react";

export const useAccount = () => {
  const [account, setAccount] = useState<AccountInfo>();

  async function query() {
    const activeAccount = await wallet.client.getActiveAccount();
    setAccount(activeAccount);
  }

  useEffect(() => {
    query();
  }, []);

  return { account, refetch: query };
};
