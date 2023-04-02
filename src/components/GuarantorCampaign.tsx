"use client";

import Link from "next/link";
import LoadingLiquidity from "./LoadingLiquidity";
import { Campaign as ICampaign, Renter, Verifier } from "@prisma/client";
import { displayPrice } from "@/utils/price";
import { getVerifier } from "@/utils/crypto";
import { useEffect, useState } from "react";
import { Tezos } from "@/utils/wallet";
import { useAccount } from "@/hooks/wallet";

export const GuarantorCampaign = ({
  campaign,
}: {
  campaign: ICampaign & { Renter: Renter & { verifier: Verifier } };
}) => {
  return (
    <div className="place-items-center grid grid-cols-6 bg-[rgba(0,0,0,0.02)] border-2 border-[rgba(0,0,0,0.13)] rounded-xl py-6 px-12">
      <Link
        href={`https://ghostnet.tzkt.io/${campaign.renterAddress}`}
        target="_blank"
        className="font-medium text-primary-400"
      >
        {campaign.renterAddress.slice(0, 6)}...
        {campaign.renterAddress.slice(-4)}
      </Link>
      <p className="text-primary-400">{getVerifier(campaign)}</p>
      <p>{displayPrice(campaign.rent)}</p>
      <p>
        {new Intl.DateTimeFormat("en", {
          month: "2-digit",
          year: "2-digit",
        }).format(
          new Date(campaign.createdAt).getTime() + 1000 * 3600 * 24 * 30
        )}
      </p>
      <p>$0</p>
      <LoadingLiquidity current={0} goal={campaign.toCollect} />
    </div>
  );
};

export default GuarantorCampaign;
