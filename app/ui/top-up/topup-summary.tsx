"use client";

import { Button } from "@/components/ui/button";
import useOrder from "@/hooks/use-order";
import { PencilIcon } from "lucide-react";
import Image from "next/image";

const TopupSummary = () => {
  const { homecardinputData, orderOperator } = useOrder();

  return (
    orderOperator && (
      <div className="flex justify-between w-full items-center max-w-md mx-auto border-2 border-slate-300 rounded-md mb-4 p-2">
        <Image
          src={orderOperator.logoUrls[0]}
          width={50}
          height={50}
          alt="logo"
        />
        <span className="text-xl font-medium">
          {orderOperator.country.name}
        </span>
        <span className="text-xl font-medium">
          {homecardinputData?.phonenumber}
        </span>
        <Button variant="ghost">
          <PencilIcon />
        </Button>
      </div>
    )
  );
};

export default TopupSummary;
