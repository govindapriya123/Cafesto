import { useCustomMutation, useCustomQuery } from "./fetch";
import { fetcher } from "./fetch";
const fetchLogin=async(loginData: any)=>{
  return fetcher('http://localhost:8086/auth/login','POST',loginData);
}
export const useLoginQuery=( onSuccess: (data: any) => void,
onError: (error: any) => void)=>{
    return useCustomMutation<any,Error,any,any>({
        mutationFn: fetchLogin,
        onSuccess
           ,
        onError
    });
};