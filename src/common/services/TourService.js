import Api from '../helpers/Api';

class TourService {
    getTours() {
        return Api.get(`/passeios`);
    }

    getTour(id) {
        return Api.get(`/passeios/${id}`);
    }

    createTour(data) {
        return Api.post(`/passeios`, data);
    }

    updateTourById(id, data) {
        return Api.put(`/passeios/${id}`, data);
    }

    deleteTourById(id) {
        return Api.delete(`/passeios/${id}`);
    }
}

export default new TourService();
