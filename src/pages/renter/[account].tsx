import { prisma } from "@/utils/prisma";
import styles from "./RenterPage.module.css";
import { useAccount } from "@/hooks/wallet";
import { GetServerSideProps } from "next";
import "../../app/globals.css";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Campaign, Renter, Verifier } from "@prisma/client";
import { useEffect, useState } from "react";
import { Tezos } from "@/utils/wallet";
import { displayPrice } from "@/utils/price";
import { getVerifier } from "@/utils/crypto";

export default function RenterPage({
  campaign,
}: {
  campaign: Campaign & { Renter: Renter & { verifier: Verifier } };
}) {
  const { account } = useAccount();
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    async function query() {
      const sc = await Tezos.contract.at(campaign.contractAddress);
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
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-orange-400 mb-5">Current campaign</h1>
        <div className="w-3/4 flex flex-col justify-between items-center bg-zinc-100 rounded-3xl border border-black border-opacity-25 p-10 mb-10">
          <h2 className="text-4xl font-medium text-black mb-auto">
            Expires :{" "}
            <span className="text-orange-400">
              {new Intl.DateTimeFormat("en").format(
                new Date(campaign.createdAt).getTime() + 1000 * 3600 * 24 * 30
              )}
            </span>
          </h2>
          <div className="mt-5 mb-2">
            {((collected / campaign.toCollect) * 100).toFixed(2)}% collected
          </div>
          <div className="w-3/4 h-8 bg-dark">
            <div
              className="h-8 bg-orange-400"
              style={{
                width:
                  ((collected / campaign.toCollect) * 100).toFixed(2) + "%",
              }}
            ></div>
          </div>
          <div className="mt-2">
            {displayPrice(collected)} / {displayPrice(campaign.toCollect)}
          </div>
          <div className="justify-center my-5">
            <div className="font-bold md-auto my-2 text-center w-full">
              Details
            </div>
            <div className="justify-center">
              Maximum rent :{" "}
              <span className="text-orange-400">
                {displayPrice(campaign.rent)}
              </span>
            </div>
            <div>
              Maximum Expiration date :{" "}
              <span className="text-orange-400">
                {new Intl.DateTimeFormat("en", {
                  month: "2-digit",
                  year: "2-digit",
                }).format(
                  new Date(campaign.createdAt).getTime() + 1000 * 3600 * 24 * 30
                )}
              </span>
            </div>
            <div>
              Verified :{" "}
              <span className="text-orange-400">{getVerifier(campaign)}</span>
            </div>
            <div>
              Premium :{" "}
              <span className="text-orange-400">
                {(campaign.premium * 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const campaign: any = await prisma.campaign.findFirst({
    take: 1,
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    where: {
      renterAddress: ctx.params?.account as string,
    },
    include: {
      Renter: {
        include: {
          verifier: {},
        },
      },
    },
  });

  if (!campaign) return { notFound: true };

  campaign.leaseExpiry = campaign.leaseExpiry.getTime();
  campaign.createdAt = campaign.createdAt.getTime();
  campaign.Renter.birth_date = campaign.Renter.birth_date.getTime();

  return {
    props: {
      campaign,
    },
  };
};
