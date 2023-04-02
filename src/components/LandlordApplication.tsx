"use client";

import Link from "next/link";
import Button from "./Button";
import { Campaign as ICampaign, Renter, Verifier } from "@prisma/client";
import { displayPrice } from "@/utils/price";
import { getVerifier } from "@/utils/crypto";

export const LandlordApplication = ({
  campaign,
}: {
  campaign: ICampaign & { Renter: Renter & { verifier: Verifier } };
}) => {
  return (
    <div className="place-items-center grid grid-cols-7 bg-[rgba(0,0,0,0.02)] border-2 border-[rgba(0,0,0,0.13)] rounded-xl py-6 px-12">
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
        }).format(new Date(campaign.leaseExpiry))}
      </p>
      <p>
        {new Intl.DateTimeFormat("en", {
          month: "2-digit",
          year: "2-digit",
        }).format(
          new Date(campaign.createdAt).getTime() + 1000 * 3600 * 24 * 30
        )}
      </p>
      <p>$0</p>
      <Button onClick={() => {}}>Create Contract</Button>
    </div>
  );
};

export default LandlordApplication;
