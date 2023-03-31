import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-full grid place-content-center p-6">
      <Image
        src={"/logotype.svg"}
        width={157}
        height={30}
        alt="logotype guarantease"
      />
    </div>
  );
};
