const { RELOADLY_CLIENT_ID, RELOADLY_CLIENT_SECRET, ENVIRONNEMENT } = process.env;
//import fetch from "node-fetch"

export async function getToken(){
    try {
        if (!RELOADLY_CLIENT_ID || !RELOADLY_CLIENT_SECRET) {
            throw new Error("MISSING_API_CREDENTIALS");
          }

        

          const response = await fetch("https://auth.reloadly.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: RELOADLY_CLIENT_ID,
              client_secret:RELOADLY_CLIENT_SECRET,
              grant_type: "client_credentials",
              audience: "https://topups-sandbox.reloadly.com",
            }),
          });
    
          const data = await response.json();
         
          return data.access_token
          
    } catch (error:any) {
        console.log(error)
    }
}

export async function getCountries(){
    let countriesurl = "https://topups-sandbox.reloadly.com/countries";

    if (ENVIRONNEMENT=="PROD"){
            countriesurl = "https://topups.reloadly.com/countries"
        } 

    const access_token = await getToken();

    const response = await fetch(countriesurl, {
      method: "GET",
      headers: {
        
        Accept: 'application/com.reloadly.topups-v1+json',
        Authorization: `Bearer ${access_token}`
      }
    });

    if(!response.ok) return {message:"failed get countries"};

    const data = await response.json()
    return data
}