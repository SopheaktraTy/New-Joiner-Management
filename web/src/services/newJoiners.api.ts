import { api } from "./api";

export async function fetchNewJoiners() {
    const { data } = await api.get("/new-joiners");
    return data;
}