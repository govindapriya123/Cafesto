import { useCustomMutation } from "./fetch";
import { fetcher } from "./fetch";
const fetchRegister=async(loginData: any)=>{
  return fetcher('http://localhost:8086/auth/signup','POST',loginData);
}
export const useSignupQuery=( onSuccess: (data: any) => void,
onError: (error: any) => void)=>{
    return useCustomMutation<any,Error,any,any>({
        mutationFn: fetchRegister,
        onSuccess,
        onError
    });
};