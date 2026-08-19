import api from "./api";

export const login = async (emailOrusername, password) => {
    const res = await api.post("/api/auth/login",{emailOrusername, password,});
    return res.data;
};

export const logout = async () => {
    const res = await api.get("/api/auth/logout");
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/api/auth/me");
    return res.data;
};