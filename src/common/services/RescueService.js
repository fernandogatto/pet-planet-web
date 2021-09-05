import Api from '../helpers/Api';

class RescueService {
    getRescues() {
        return Api.get(`/resgates`);
    }

    getRescue(id) {
        return Api.get(`/resgates/${id}`);
    }

    postRescue(data) {
        return Api.get(`/resgates`, data);
    }
}

export default new RescueService();
