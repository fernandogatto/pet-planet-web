import Api from '../helpers/Api';

class PetService {
    getPets() {
        return Api.get(`/pets`);
    }

    getPet(id) {
        return Api.get(`/pets/${id}`);
    }
}

export default new PetService();
