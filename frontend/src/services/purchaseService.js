import api from "./api";

export const getPurchaseOrders = async({
    page = 1,
    limit = 10,
    search = "",
})=>{
    const res = await api.get("/api/purchase/Orders",{
        params:{
            page,
            limit,
            search
        }
    });
    return res.data
}