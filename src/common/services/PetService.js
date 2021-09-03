import Api from '../helpers/Api';

class PetService {
    getPets() {
        return Api.get(`/pets`);
    }
}

export default new PetService();
