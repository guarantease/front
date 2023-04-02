import GuarantorGuarantee from "@/components/GuarantorGuarantee";
import LandlordApplication from "@/components/LandlordApplication";
import LandLordRent from "@/components/LandlordRent";
import { prisma } from "@/utils/prisma";

export default async function LandLordPage() {
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
      <div className="flex items-center justify-around">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-medium">Balance</h2>
          <h1 className="text-5xl font-medium">
            {new Intl.NumberFormat("en", {
              currency: "USD",
              style: "currency",
              maximumFractionDigits: 0,
            }).format(15000)}
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-medium">Coming next month</h2>
          <h1 className="text-5xl font-medium">
            {new Intl.NumberFormat("en", {
              currency: "USD",
              style: "currency",
              maximumFractionDigits: 0,
            }).format(800)}
          </h1>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-medium">Total to receive</h2>
          <h1 className="text-5xl font-medium">
            {new Intl.NumberFormat("en", {
              currency: "USD",
              style: "currency",
              maximumFractionDigits: 0,
            }).format(50000)}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl">Ongoing rents</h1>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-6 px-12 place-items-center">
            <p>renter address</p>
            <p>verifier</p>
            <p>monthly rent</p>
            <p>lease expiration (MM/YY)</p>
            <p>available renter balance</p>
          </div>
          {campaigns.map((c) => (
            <LandLordRent campaign={c} key={c.renterAddress} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl">Pending renter applications</h1>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-7 px-12 place-items-center">
            <p>renter address</p>
            <p>verifier</p>
            <p>max monthly rent</p>
            <p>max lease expiration (MM/YY)</p>
            <p>guarantee availability (MM/YY)</p>
            <p>total collected</p>
          </div>
          {campaigns.map((c) => (
            <LandlordApplication campaign={c} key={c.renterAddress} />
          ))}
        </div>
      </div>
    </>
  );
}
