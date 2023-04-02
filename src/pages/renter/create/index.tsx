"use client";

import { useAccount } from "@/hooks/wallet";
import { Tezos, wallet } from "@/utils/wallet";
import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { code } from "../../../utils/campaign";

export default function CreateRenter() {
  const fnameRef = useRef<HTMLInputElement>(null);
  const lnameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const wageRef = useRef<HTMLInputElement>(null);
  const mexpRef = useRef<HTMLInputElement>(null);
  const mRentRef = useRef<HTMLInputElement>(null);
  const impositionRef = useRef<HTMLInputElement>(null);
  const { account, refetch } = useAccount();

  const create = async () => {
    await refetch();
    if (!account) return;
    const data = await (
      await fetch(`/api/renter/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: account.address,
          last_3_wage_avg: Number(wageRef.current?.value),
          status: statusRef.current?.value,
          last_name: lnameRef.current?.value,
          first_name: fnameRef.current?.value,
          birth_date: new Date(),
          imposition: Number(impositionRef.current?.value),
          employer: "UKN",
          verifierPublicKey:
            "edpkuwc6Jfa36FERkNex3ghpdtrnjkjbLHgwyXPZCT63PUFrFfD3wk",
          verificationSignature: "0",
          score: 80,
        }),
      })
    ).json();
    const data2 = await (
      await fetch(`/api/campaign/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractAddress: "KT1L45FgYvLkU2jbWMSnGgXf6GBPjfBrFAf8",
          renterAddress: account.address,
          premium: 0.08,
          leaseExpiry: new Date(mexpRef.current?.value || 0),
          toCollect: Math.floor(
            Number(mRentRef.current?.value) *
              ((new Date(mexpRef.current?.value || 0).getTime() - Date.now()) /
                (3600 * 1000 * 24 * 30))
          ),
          rent: Number(mRentRef.current?.value),
        }),
      })
    ).json();
    toast.success("Renter & Campaign created");
  };

  return (
    <>
      <h1 className="text-3xl font-medium">No campaign currently running </h1>
      <p>
        You have not created any campaign yet. To do so, please fill all those
        information about your renter profile. You will be contacted by our
        partner in order to check the veracity of those information. Those
        information will be used to compute a score of your profile, as well as
        the amount of collateral to raise.{" "}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <label>Fist Name</label>
          <input
            type="text"
            ref={fnameRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Last Name</label>
          <input
            type="text"
            ref={lnameRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Status</label>
          <input
            type="text"
            ref={statusRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Last 3 month revenue average</label>
          <input
            type="number"
            ref={wageRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Yearly imposition</label>
          <input
            type="number"
            ref={impositionRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Maximum expiration</label>
          <input
            type="date"
            ref={mexpRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <label>Maximum rent</label>
          <input
            type="number"
            ref={mRentRef}
            className="border-2 border-dark py-1 px-2 rounded-lg"
          />
        </div>
        <button
          className="text-white font-bold bg-primary-400 py-2 px-4 rounded-lg w-max"
          onClick={create}
        >
          Launch campaign
        </button>
      </div>
    </>
  );
}
