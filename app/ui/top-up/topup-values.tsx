"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useOrder from "@/hooks/use-order";
import BackDrop from "../backdrop";

interface FX {
  rate: number;
  currencyCode: string;
}

function TopUpValues() {
  const router = useRouter();
  const [cliqued, setCliqued] = useState(false);
  const { orderOperator, homecardinputData, setOrderData, orderData } =
    useOrder();

  if (!orderOperator) {
    return null;
  }

  const fx: FX = { ...orderOperator.fx };
  const logo = orderOperator.logoUrls[0];
  const country = orderOperator.country.name;

  const handleOrder = (amount: number) => {
    const order = {
      operatorId: orderOperator.id.toString(),
      countryName: orderOperator.country.name,
      countryCode: orderOperator.country.isoName,
      phonenumber: homecardinputData?.phonenumber.toString(),
      amountLocal: Math.ceil(amount * fx.rate).toString(),
      currencyCode: orderOperator.destinationCurrencyCode,
      amountEur: amounttopay(20, fx.rate, amount).toFixed(2).toString(),
    };
    setOrderData({
      ...order,
      logo: orderOperator.logoUrls[0],
      fx: fx.rate,
    });

    router.push("/summary");
  };

  const toggleOpen = () => {
    setCliqued(!cliqued);
  };

  function amounttopay(t: number, fx: number, amount: number) {
    const amtp = amount * ((fx + (fx * t) / 100) / fx);
    return amtp;
  }

  return (
    orderOperator && (
      <>
        <div className="relative z-30">
          <div className="flex justify-between items-center max-w-md mx-auto border-2 border-slate-300 rounded-md mb-4 p-2">
            <Image src={logo} width={50} height={50} alt="logo" />
            <span className="text-xl font-medium">{country}</span>
            <span className="text-xl font-medium">
              {homecardinputData?.phonenumber}
            </span>
            <Button variant="ghost">
              <PencilIcon />
            </Button>
          </div>
          <div className=" flex flex-col gap-3 max-w-md mx-auto border-2 border-slate-300 rounded-md p-4 ">
            {orderOperator.denominationType === "FIXED" &&
              orderOperator.fixedAmounts.map((amount: number) => (
                <div
                  key={amount}
                  className="flex justify-between items-center h-20 w-full rounded-md p-4 border-2 border-blue-300"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">
                      {Math.ceil(amount * fx.rate)} {fx.currencyCode}
                    </span>
                    <span>
                      pay {amounttopay(20, fx.rate, amount).toFixed(2)} €
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      handleOrder(amount);
                      setCliqued(true);
                    }}
                    className="w-[150px] bg-blue-500 hover:bg-blue-600"
                    disabled={cliqued}
                  >
                    Pay now
                  </Button>
                </div>
              ))}

            {orderOperator.denominationType === "RANGE" &&
              orderOperator.suggestedAmounts.map((amount: number) => (
                <div
                  key={amount}
                  className="flex justify-between items-center h-20 w-full rounded-md p-4 border-2 border-blue-300"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xl">
                      {Math.ceil(amount * fx.rate)} {fx.currencyCode}
                    </span>
                    <span>
                      pay {amounttopay(20, fx.rate, amount).toFixed(2)} €
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      handleOrder(amount);
                      setCliqued(true);
                    }}
                    className="w-[150px] bg-blue-500 hover:bg-blue-600"
                    disabled={cliqued}
                  >
                    Pay now
                  </Button>
                </div>
              ))}
          </div>
        </div>
        {cliqued ? <BackDrop onClick={toggleOpen} /> : null}
      </>
    )
  );
}

export default TopUpValues;
