import { api } from "./api.service";
export interface StartUp {
    id: number,
    description: string,
    name: string,
    files: File[],
    user: User
}

export interface File {
    id: number,
    url: string
}
export interface User {
    country: string,
    email: string,
    firstName: string,
    lastName: string
}
const startUpService = {
    getList: () => {
        return api("project", {
            method: "GET"
        }).then(res => res).catch(err => err);
    },
    add: (model: StartUp) => {
        return api("project", {
            method: "POST",
            data: model
        }).then(res => res).catch(err => err);
    },
    update: (id: number, model: StartUp) => {
        return api(`project/${id}`, {
            method: "PUT",
            data: model
        }).then(res => res).catch(err => err);
    },
    delete: (id: number) => {
        return api(`project/${id}`, {
            method: "DELETE"
        }).then(res => res).catch(err => err);
    },
    search: (name: string) => {
        return api<StartUp[]>(`project/search?name=${name}`, {
            method: "GET",
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    find: (id: string) => {
        return api<StartUp>(`project/${id}`, {
            method: "GET",
        }).then(res => res).catch(err => {
            throw err;
        });
    }
}

export default startUpService;