"use client";

import Link from "next/link";
import Button from "./Button";
import { Campaign as ICampaign, Renter, Verifier } from "@prisma/client";

export const GuarantorExpiredCampaign = ({
  campaign,
}: {
  campaign: ICampaign & { Renter: Renter & { verifier: Verifier } };
}) => {
  return (
    <div className="place-items-center grid grid-cols-8 bg-[rgba(0,0,0,0.02)] border-2 border-[rgba(0,0,0,0.13)] rounded-xl py-6 px-12">
      <Link
        href={`https://ghostnet.tzkt.io/${campaign.renterAddress}`}
        target="_blank"
        className="font-medium text-primary-400"
      >
        {campaign.renterAddress.slice(0, 6)}...
        {campaign.renterAddress.slice(-4)}
      </Link>
      <p>$0</p>
      <Button onClick={() => {}}>Withdraw</Button>
    </div>
  );
};

export default GuarantorExpiredCampaign;
