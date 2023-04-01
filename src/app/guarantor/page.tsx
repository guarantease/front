import GuarantorCampaign from "@/components/GuarantorCampaign";
import GuarantorExpiredCampaign from "@/components/GuarantorExpiredCampaign";
import { GuarantorGuarantee } from "@/components/GuarantorGuarantee";
import { prisma } from "@/utils/prisma";

export default async function Guarantor() {
  const campaigns = await prisma.campaign.findMany({
    take: 10,
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    include: {
      Renter: {
        include: {
          verifier: {},
        },
      },
    },
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl">Ongoing guarantees</h1>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-8 px-12 place-items-center">
            <p>renter address</p>
            <p>verifier</p>
            <p>monthly rent</p>
            <p>lease expiration (MM/YY)</p>
            <p>available renter balance</p>
            <p>deposited</p>
            <p>APY</p>
          </div>
          {campaigns.map((c) => (
            <GuarantorGuarantee campaign={c} key={c.renterAddress} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl">Ongoing campaigns</h1>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-6 px-12 place-items-center">
            <p>renter address</p>
            <p>verifier</p>
            <p>monthly rent</p>
            <p>campaign expiration (MM/YY)</p>
            <p>deposited</p>
            <p>collected liquidity</p>
          </div>
          {campaigns.map((c) => (
            <GuarantorCampaign campaign={c} key={c.renterAddress} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl">Expired campaigns</h1>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-8 px-12 place-items-center">
            <p>renter address</p>
            <p>deposited</p>
          </div>
          {campaigns.map((c) => (
            <GuarantorExpiredCampaign campaign={c} key={c.renterAddress} />
          ))}
        </div>
      </div>
    </>
  );
}
