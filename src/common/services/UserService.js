import Api from '../helpers/Api';

class UserService {
    getUser(id) {
        return Api.get(`/usuarios/${id}`);
    }

    createUser(data) {
        return Api.post(`/usuarios`, data);
    }
}

export default new UserService();
