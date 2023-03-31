export const Score = ({ value }: { value: number }) => {
  const color =
    value < 50 ? "bg-error" : value > 80 ? "bg-success" : "bg-primary-400";

  return (
    <div
      className={`${color} text-white py-1 px-4 font-bold rounded-lg border-4 border-[rgba(0,0,0,0.1)]`}
    >
      {value}
    </div>
  );
};

export default Score;
