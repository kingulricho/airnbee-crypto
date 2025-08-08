import { Check, Star } from "lucide-react";
import Image from "next/image";
import { Country } from "./lib/definitions";
import HomeCard from "./ui/home/home-card";
import { getCountries } from "./lib/actions";

export default async function Page() {
  const countries: Country[] = await getCountries();
  if (!countries) return <div>no countries</div>;
  return (
    <div className="flex flex-col">
      <div className="mx-auto max-w-md">
        <div className="text-wrap w-full mt-4 mb-4 font-semibold !leading-tight text-gray-900 text-xl md:text-2xl lg:text-xl">
          Send Airtime to your Loved ones
          <span className="bg-slate-700 px-2 text-white rounded-md">
            wherever they are
          </span>
        </div>

        <HomeCard countries={countries} />
      </div>
      <div className="text-wrap text-center w-full mt-10 mb-4 font-semibold !leading-tight text-gray-900 text-2xl md:text-2xl lg:text-2xl">
        Over 200+ countries available
      </div>

      {/*   <p className="mt-8 mx-auto text-lg lg:pr-10 max-w-md text-center lg:text-left text-balance md:text-wrap">
        We are available in more than 250 countries and partners with more than
        600 telephone operators. Our mission is to provide you with instant
        communication credit regardless of your geographic location.
      </p> */}

      <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:px-40 mt-4">
        {/* First user review */}
        <div className="flex flex-auto flex-col  gap-4 lg:pr-8 xl:pr-20 max-w-md p-4">
          <div className="flex gap-0.5 mb-2">
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
          </div>
          <div className="text-lg leading-8">
            <p>
              the application
              <span className="px-1 mx-1 bg-slate-800 text-white">
                loads quickly
              </span>{" "}
              compared to others, the interface is simple and practical , it's
              great. bravo to you I already buy my communication credit there
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            <Image
              width={50}
              height={50}
              className="rounded-full object-cover"
              src="/users/user-1.png"
              alt="user image"
            />
            <div className="flex flex-col">
              <p className="font-semibold">Mario</p>
              <div className="flex gap-1.5 items-center text-zinc-600">
                <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                <p className="text-sm">Verified purchase</p>
              </div>
            </div>
          </div>
        </div>

        {/* second user review */}
        <div className="flex flex-auto flex-col  gap-4 lg:pr-8 xl:pr-20 max-w-md p-4">
          <div className="flex gap-0.5 mb-2">
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
            <Star className="h-5 w-5 text-green-600 fill-green-600" />
          </div>
          <div className="text-lg leading-8">
            <p>
              it's great. What I like about this application is its speed in
              delivering the purchased communication credit. The communication
              credit arrives
              <span className="px-1 mx-1 bg-slate-800 text-white">
                instantly
              </span>{" "}
              after payment
            </p>
          </div>
          <div className="flex gap-4 mt-2">
            <Image
              width={50}
              height={50}
              className="rounded-full object-cover"
              src="/users/user-2.png"
              alt="user image"
            />
            <div className="flex flex-col">
              <p className="font-semibold">Celine</p>
              <div className="flex gap-1.5 items-center text-zinc-600">
                <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                <p className="text-sm">Verified purchase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUPPORTED PAYMENT METHODS */}
      <div className="text-wrap text-center w-full mt-6 mb-8 font-semibold !leading-tight text-gray-900 text-2xl md:text-2xl lg:text-2xl">
        Supported payment methods
      </div>
      <div className="mx-auto max-w-2xl grid grid-cols-4 items-center justify-between gap-5 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-8 lg:px-40">
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/visa.jpg"
          alt="user image"
        />
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/mastercard.png"
          alt="user image"
        />
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/paypal.png"
          alt="user image"
        />
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/amex.png"
          alt="user image"
        />

        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/bancontact.jpg"
          alt="user image"
        />
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/ideal.png"
          alt="user image"
        />
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/jcb.jpeg"
          alt="user image"
        />
        <Image
          width={50}
          height={50}
          className=" object-cover"
          src="/paymethods/eps.png"
          alt="user image"
        />
      </div>
    </div>
  );
}
