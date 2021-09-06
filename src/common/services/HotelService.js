import Api from '../helpers/Api';

class HotelService {
    getHotels() {
        return Api.get(`/hoteis`);
    }

    getHotel(id) {
        return Api.get(`/hoteis/${id}`);
    }

    createHotel(data) {
        return Api.post(`/hoteis`, data);
    }

    updateHotelById(id, data) {
        return Api.put(`/hoteis/${id}`, data);
    }

    deleteHotelById(id) {
        return Api.delete(`/hoteis/${id}`);
    }
}

export default new HotelService();
