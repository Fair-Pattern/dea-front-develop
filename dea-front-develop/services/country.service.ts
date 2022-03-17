import { api } from "./api.service";

export type Country = {
    id: number;
    isO1: string;
    isO2: string;
    name: string;
    nameCode: string;
    printableName: string;
};

const countryService = {
    getInfo: () => {
        return Promise.resolve({
            name: "Test User",
            email: "testuser@gmail.com",
            role: "Admin"
        })
    },
    list: () => {
        return api<Country[]>("country").then(res => res).catch(err => err);
    }
}

export default countryService;