import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

export const Tezos = new TezosToolkit("https://rpc.ghostnet.teztnets.xyz/");
export const wallet = new BeaconWallet({ name: "Guarantease" });
Tezos.setWalletProvider(wallet);
