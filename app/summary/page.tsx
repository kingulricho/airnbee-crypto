import { Button } from "@/components/ui/button";
import TopupSummary from "../ui/top-up/topup-summary";
import CryptoPayment from "../ui/top-up/payment/crypto";
import Paypal from "../ui/top-up/payment/paypal";

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <TopupSummary />
      <div className="max-w-md mx-auto">
        <Paypal />
      </div>
    </div>
  );
};

export default Page;
