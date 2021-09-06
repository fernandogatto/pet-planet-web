import Api from '../helpers/Api';

class PetService {
    getPets() {
        return Api.get(`/pets`);
    }

    getPet(id) {
        return Api.get(`/pets/${id}`);
    }

    createPet(data) {
        return Api.post(`/pets`, data);
    }

    updatePetById(id, data) {
        return Api.put(`/pets/${id}`, data);
    }

    deletePetById(id) {
        return Api.delete(`/pets/${id}`);
    }
}

export default new PetService();
