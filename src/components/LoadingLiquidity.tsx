export const LoadingLiquidity = ({
  current,
  goal,
}: {
  current: number;
  goal: number;
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p>
        {new Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
          maximumFractionDigits: 0,
        }).format(current)}{" "}
        -{" "}
        {new Intl.NumberFormat("en", {
          currency: "USD",
          style: "currency",
          maximumFractionDigits: 0,
        }).format(goal)}
      </p>
      <div className="w-full relative h-4 bg-dark overflow-hidden rounded-sm">
        <div
          className={`top-0 left-0 absolute bg-primary-400 h-4`}
          style={{
            width: `${Math.round((current / goal) * 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingLiquidity;
