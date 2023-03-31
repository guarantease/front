import Image from "next/image";
import Link from "next/link";
import Wallet from "./Wallet";

export const Header = () => {
  return (
    <div className="w-full flex items-center justify-between py-3 px-6">
      <Link href={"/"}>
        <Image
          src={"/logotype.svg"}
          width={157}
          height={30}
          alt="logotype guarantease"
        />
      </Link>
      <div className="flex items-center gap-12 font-bold text-primary-500 uppercase">
        <Link href={"/landlord"}>Landlord</Link>
        <Link href={"/renter"}>Renter</Link>
        <Link href={"/guarantor"}>Guarantor</Link>
        <Wallet />
      </div>
    </div>
  );
};

export default Header;
