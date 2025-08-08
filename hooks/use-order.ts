import { Operator, StateStoragebyme } from "@/app/lib/definitions";
import  secureLocalStorage  from  "react-secure-storagebyking";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

  const SecureStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
      return secureLocalStorage.getItem(name) || null;
    },
    setItem: async (name: string, value: string): Promise<void> => {
      secureLocalStorage.setItem(name, value);
    },
    removeItem: async (name: string): Promise<void> => {
      secureLocalStorage.removeItem(name);
    },
  };  

interface OrderStore {
    homecardinputData: homecardinputDataType | null;
    orderOperator:Operator | null;
    orderData:orderType | null;
    paymentIntentId:string | null;
    clientSecret:string | undefined;
    setHomecardinputData: (data:homecardinputDataType) => void;
    setOrderOperator: (data:any) => void;
    setOrderData: (data:orderType) => void;
    setPaymentIntentId: (data:string) => void;
    setClientSecret: (data:string) => void;
    resetOrder: ()=> void;
}

type homecardinputDataType = {
    countryIsoName:string;
    phonenumber:number;
}

export type orderType = {
    logo:string;
    operatorId:string;
    countryName:string;
    phonenumber:string | undefined;
    countryCode:string;
    amountLocal:string;
    currencyCode:string;
    amountEur:string;
    fx:number;
}

const useOrder = create<OrderStore>()(
    
persist(    (set)=>({
    homecardinputData:null,
    orderOperator: null,
    orderData:null,
    paymentIntentId:null,
    clientSecret:undefined,
    setHomecardinputData:(data:homecardinputDataType)=> {
        set({homecardinputData:data});
    },
    setOrderOperator:(data:any)=> {
        set({orderOperator:data});
    },
    setOrderData:(data:orderType)=> {
        set({orderData:data});
    },
    setPaymentIntentId:(data:string)=> {
        set({paymentIntentId:data});
    },
    setClientSecret:(data:string)=> {
        set({clientSecret:data});
    },
    resetOrder:()=>{
        set({homecardinputData: null,
            orderOperator: null,
            orderData:null,
            paymentIntentId:null,
        })
    }
}),{
    name: "order",
     storage: createJSONStorage(() => SecureStorage),  
})

)

export default useOrder;