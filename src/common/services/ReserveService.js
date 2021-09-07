import Api from '../helpers/Api';

class ReserveService {
    getReserves() {
        return Api.get(`/reservas`);
    }

    getReserveByUserId(user_id) {
        return Api.get(`/reservas/usuario/${user_id}`);
    }

    postReserve(data) {
        return Api.post(`/reservas`, data);
    }

    updateReserveById(id, data) {
        return Api.put(`/reservas/${id}`, data);
    }

    deleteReserveById(id) {
        return Api.delete(`/reservas/${id}`);
    }
}

export default new ReserveService();
