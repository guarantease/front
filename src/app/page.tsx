import Campaign from "@/components/Campaign";
import { HomePopup } from "@/components/HomePopup";
import { prisma } from "@/utils/prisma";

export default async function Home() {
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
      <h1 className="text-4xl font-medium">Latest rental campaigns</h1>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-8 px-12 place-items-center">
          <p>renter address</p>
          <p>verifier</p>
          <p>monthly rent</p>
          <p>premium</p>
          <p>score</p>
          <p>lease expiration (MM/YY)</p>
          <p>collected liquidity</p>
        </div>
        {campaigns.map((c) => {
          return <Campaign key={c.renterAddress} campaign={c} />;
        })}
      </div>
    </>
  );
}
