"use client";

import useOrder from "@/hooks/use-order";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const [counter, setCounter] = useState(4);
  const router = useRouter();
  const { resetOrder } = useOrder();

  if (counter == 0) {
    router.push("/");
  }

  setInterval(() => {
    setCounter(counter - 1);
  }, 1000);

  useEffect(() => {
    resetOrder();
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 pt-20">
      <div className="text-xl">
        Thanks your transaction was successfull. <br /> your airtime will be
        delivered within 5 minut
      </div>
      <div className="text-xl font-semibold">redirecting to home ...</div>
    </div>
  );
}
