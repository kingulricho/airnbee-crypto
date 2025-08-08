import { NextResponse } from "next/server";
import { getToken } from "@/app/lib/actions";

const { RELOADLY_CLIENT_ID, RELOADLY_CLIENT_SECRET,ENVIRONNEMENT } = process.env;


export async function POST(req:Request){

    const {countryIsoName,phonenumber} = await req.json();
    const access_token = await getToken();

    let url =` https://topups-sandbox.reloadly.com/operators/auto-detect/phone/${phonenumber}/countries/${countryIsoName}`

    if(ENVIRONNEMENT=="PROD"){
        url =  ` https://topups.reloadly.com/operators/auto-detect/phone/${phonenumber}/countries/${countryIsoName}`
    }

    
     try {
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
              Accept: 'application/com.reloadly.topups-v1+json',
              Authorization: `Bearer ${access_token}`
            }
          });
          if(!response.ok){
            return NextResponse.json({message:"phone checked is bad"})
        }
          const data = await response.json();
          
          return NextResponse.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"phone checked is bad"})
    } 

}