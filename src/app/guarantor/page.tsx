export default async function Guarantor() {
  return (
    <>
      {/* <div>
        <h1 className="text-4xl">Ongoing guarantees</h1>
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
      </div> */}
      <div>
        <h1 className="text-4xl">Ongoing campaigns</h1>
      </div>
      <div>
        <h1 className="text-4xl">Expired campaigns</h1>
      </div>
    </>
  );
}
