"use client";

import { Country } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import useOrder from "@/hooks/use-order";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

function HomeCard({ countries }: { countries: Country[] }) {
  const router = useRouter();
  const { setHomecardinputData, setOrderOperator } = useOrder();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  let options: any = [];
  countries.map((country) => {
    let option = { value: country.isoName, label: country.name };
    options.push(option);
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phonenumber = formData.get("phonenumber");
    const countryIsoName = formData.get("countryIsoName");
    const homecardinputData = {
      countryIsoName: countryIsoName as string,
      phonenumber: Number(phonenumber),
    };

    setIsLoading(true);
    axios
      .post("api/checkphone", {
        countryIsoName: countryIsoName,
        phonenumber: phonenumber,
      })
      .then((res) => {
        console.log("operator", res.data);
        if (res.data.id) {
          //save data to zustrand
          setHomecardinputData(homecardinputData);
          setOrderOperator(res.data);
          //   router push to recharge
          router.push("/top-up");

          setIsLoading(false);
        } else {
          setErrorMessage(
            "Nous ne prenons pas en charge ce numero de telephone. Veuillez reessayer un autre svp"
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full border-2 mx-auto p-4 rounded-md">
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <Select options={options} name="countryIsoName" />
        <input
          className="p-2 border-[1px] rounded-sm"
          type="number"
          name="phonenumber"
        />
        <Button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white hover:bg-blue-400"
          type="submit"
        >
          {isLoading ? "phone number checking" : "Send airtime"}
        </Button>
      </form>

      <div className="w-full text-red-500 text-wrap mt-2">{errorMessage}</div>
    </div>
  );
}

export default HomeCard;
