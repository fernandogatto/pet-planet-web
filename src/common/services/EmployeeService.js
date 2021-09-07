import Api from '../helpers/Api';

class EmployeeService {
    getEmployees() {
        return Api.get(`/funcionarios`);
    }

    createEmployee(data) {
        return Api.post(`/funcionarios`, data);
    }

    updateEmployeeById(id, data) {
        return Api.put(`/funcionarios/${id}`, data);
    }

    deleteEmployeeById(id) {
        return Api.delete(`/funcionarios/${id}`);
    }
}

export default new EmployeeService();
