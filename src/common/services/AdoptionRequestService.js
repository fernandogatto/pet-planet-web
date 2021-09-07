import Api from '../helpers/Api';

class AdoptionRequestService {
    getAdoptionRequests() {
        return Api.get(`/adocoes`);
    }

    getAdoptionRequestByUserId(user_id) {
        return Api.get(`/adocoes/usuario/${user_id}`);
    }

    postAdoptionRequest(data) {
        return Api.post(`/adocoes`, data);
    }

    putAdoptionRequestById(id, data) {
        return Api.delete(`/adocoes/${id}`, data);
    }

    deleteAdoptionRequestById(id) {
        return Api.delete(`/adocoes/${id}`);
    }
}

export default new AdoptionRequestService();
