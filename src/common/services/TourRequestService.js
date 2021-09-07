import Api from '../helpers/Api';

class TourRequestService {
    getTourRequests() {
        return Api.get(`/pedidos-passeio`);
    }

    getTourRequestByUserId(user_id) {
        return Api.get(`/pedidos-passeio/cliente/${user_id}`);
    }

    postTourRequest(data) {
        return Api.post(`/pedidos-passeio`, data);
    }

    putTourRequestById(id, data) {
        return Api.delete(`/pedidos-passeio/${id}`, data);
    }

    deleteTourRequestById(id) {
        return Api.delete(`/pedidos-passeio/${id}`);
    }
}

export default new TourRequestService();
