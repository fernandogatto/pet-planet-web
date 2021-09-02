import Api from '../helpers/Api';

class AuthService {
    createAuth(data) {
        return Api.post(`/auth`, data);
    }

    removeAuth() {
        return Api.delete(`/auth`);
    }
}

export default new AuthService();
