import Api from '../helpers/Api';

class HotelService {
    getHotels() {
        return Api.get(`/hoteis`);
    }

    getHotel(id) {
        return Api.get(`/hoteis/${id}`);
    }
}

export default new HotelService();
