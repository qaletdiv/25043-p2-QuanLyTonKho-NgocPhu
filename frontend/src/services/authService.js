import api from "./api";

export const login = async (username, password) => {
    const res = await api.post("/api/auth/login",{username, password,});
    return res.data;
};

export const logout = async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
};

export const getMe = async () => {
    const res = await api.get("/api/auth/me");
    return res.data;
};