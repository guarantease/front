"use client";
import { Campaign } from "@prisma/client";
import { useState } from "react";
export const HomePopup = ({
  campaign,
  onClose,
}: {
  campaign: Campaign;
  onClose: () => void;
}) => {
  console.log(Date.now(), new Date(campaign.leaseExpiry).getTime());

  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.36)]">
      <div className="absolute bg-white rounded-xl py-6 px-12 gap-3 flex flex-col w-1/4 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="w-full items-center flex justify-between">
          <h2 className="text-xl">
            Guarantee{" "}
            <span className="text-primary-400">
              {campaign.renterAddress.slice(0, 9)}...
              {campaign.renterAddress.slice(-4)}
            </span>
          </h2>
          <p
            className="font-bold text-black cursor-pointer text-4xl"
            onClick={onClose}
          >
            X
          </p>
        </div>
        <div className="w-full items-center justify-between flex">
          <p>
            Premium:{" "}
            <span className="text-primary-400">
              {(campaign.premium * 100).toFixed(2)}%
            </span>
          </p>
          <p>
            DeFi: <span className="text-primary-400">8%</span>
          </p>
          <p>
            Total APY:{" "}
            <span className="text-primary-400">
              {(
                (campaign.premium * 100) /
                  ((new Date(campaign.leaseExpiry).getTime() - Date.now()) /
                    (1000 * 3600 * 24 * 365.25)) +
                8
              ).toFixed(2)}
              %
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label>Amount ($)</label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-[rgba(0,0,0,0.03)] border-[rgba(0,0,0,0.13)] border-2 rounded-lg"
          />
        </div>
        <p>
          By guaranteeing a renter, your liquidity is locked during the campaign
          duration of 1 month.
        </p>
        <p>
          If the campaign succeeds, your liquidity will be locked until the
          lease if finished (
          {new Intl.DateTimeFormat("en", {
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(campaign.leaseExpiry))}
          ).
        </p>
        <button className="hover:bg-primary-400 bg-primary-500 text-white w-full py-2 font-bold rounded-lg">
          Guarantee
        </button>
      </div>
    </div>
  );
};
