import { api } from "./api.service";
export interface Podcast  {
    id: number,
    name: string,
    order: number,
    podCastUrl: string,
    thumbNailUrl?: string,
    description?: string,
    durationSecound?: number
  }
const podcastService = {
    getList: () => {
        return api<Podcast[]>("podcast/active", {
            method: "GET"
        }).then(res => res).catch(err => err);
    },
    add: (model: Podcast) => {
        return <any>api("podcast", {
            method: "POST",
            data: model
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    update: (id: number, model: Podcast) => {
        return api<any>(`podcast/${id}`, {
            method: "PUT",
            data: model
        }).then(res => res).catch(err => {
            throw err;
        });
    },
    delete: (id: number) => {
        return api(`podcast/${id}`, {
            method: "DELETE"
        }).then(res => res).catch(err => err);
    },
    updateOrderNum: (models: Podcast[]) => {
        return api(`podcast/order`, {
            method: "POST",
            data: models
        }).then(res => res).catch(err => err);
    }
}

export default podcastService;