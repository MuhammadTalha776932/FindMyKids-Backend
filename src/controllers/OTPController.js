import { validatePairing } from "../services/validatePairing.js";


export const handleOTPGet = (req,res) =>{

    res.send({message:"Get Method post"});
}

export const handleOTPPost = async (req,res) => {
    const c_code = req.body?.data?.code;
    const response = await validatePairing(c_code);
    if (response) {
        res.send({isCorrect:response,code:c_code})
    }else{
        res.send({isCorrect:response})
    }
}