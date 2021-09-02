import Api from '../helpers/Api';

class CustomerService {
    getCustomers() {
        return Api.get(`/clientes`);
    }
}

export default new CustomerService();
