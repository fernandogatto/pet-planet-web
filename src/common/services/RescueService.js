import Api from '../helpers/Api';

class RescueService {
    getRescues() {
        return Api.get(`/resgates`);
    }

    getRescue(id) {
        return Api.get(`/resgates/${id}`);
    }

    postRescue(data) {
        return Api.post(`/resgates`, data);
    }

    deleteRescueById(id) {
        return Api.delete(`/resgates/${id}`);
    }
}

export default new RescueService();
