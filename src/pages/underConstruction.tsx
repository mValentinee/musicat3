import { type NextPage } from "next";
import Image from "next/image";
import { Danger } from "iconsax-react";
import Cat from "../../public/images/cat.png";

const UnderConstruction: NextPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image src={Cat} alt="Cat" width={260} height={260} />
      <Danger size="100" color="#FF0000" variant="Bold" />
      <h1 className="text-5xl font-bold">Under Construction</h1>
    </div>
  );
};

export default UnderConstruction;
