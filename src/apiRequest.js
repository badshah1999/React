const apiRequest=async(url,Obj,error)=>{
    try{
        const response = await fetch(url,Obj)
    }catch(err){
        error=err.Message
    }finally{
        return error
    }
}
export default apiRequest;