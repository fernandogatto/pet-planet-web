import Api from '../helpers/Api';

class AdoptionRequestService {
    getAdoptionRequests() {
        return Api.get(`/pedidos`);
    }

    getAdoptionRequest(id) {
        return Api.get(`/pedidos/${id}`);
    }

    postAdoptionRequest(data) {
        return Api.post(`/pedidos`, data);
    }
}

export default new AdoptionRequestService();
