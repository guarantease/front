import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export const Tezos = new TezosToolkit("https://ghostnet.ecadinfra.com");
export const wallet = typeof window !== 'undefined' ? new BeaconWallet({ name: "Guarantease" }) : undefined as any as BeaconWallet;
Tezos.setWalletProvider(wallet);
