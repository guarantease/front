"use client";

import Link from "next/link";
import Score from "./Score";
import Button from "./Button";
import LoadingLiquidity from "./LoadingLiquidity";
import { Campaign as ICampaign, Renter, Verifier } from "@prisma/client";
import { displayPrice } from "@/utils/price";
import { getVerifier } from "@/utils/crypto";
import { HomePopup } from "./HomePopup";
import { useEffect, useState } from "react";

export const Campaign = ({
  campaign,
}: {
  campaign: ICampaign & { Renter: Renter & { verifier: Verifier } };
}) => {
  const [opened, setOpened] = useState(false);
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    async function query() {
      const sc = await (
        await import("@/utils/wallet")
      ).Tezos.contract.at(campaign.contractAddress);
      setCollected(
        Number(
          (await sc.views.getTotalSupply([["Uint"]]).read())
            .div("1e18")
            .toString()
        )
      );
    }

    query();
  }, []);

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
      <p className="text-primary-400">{getVerifier(campaign)}</p>
      <p>{displayPrice(campaign.rent)}</p>
      <p>{campaign.premium * 100}%</p>
      <Score value={campaign.Renter.score} />
      <p>
        {new Intl.DateTimeFormat("en", {
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(campaign.leaseExpiry))}
      </p>
      <LoadingLiquidity current={collected} goal={campaign.toCollect} />
      <Button onClick={() => setOpened(true)}>Guarantee</Button>

      {opened && (
        <HomePopup campaign={campaign} onClose={() => setOpened(false)} />
      )}
    </div>
  );
};

export default Campaign;
