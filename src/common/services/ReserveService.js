import Api from '../helpers/Api';

class ReserveService {
    getReserves() {
        return Api.get(`/reservas`);
    }

    getReserve(id) {
        return Api.get(`/reservas/${id}`);
    }

    postReserve(data) {
        return Api.get(`/reservas`, data);
    }
}

export default new ReserveService();
