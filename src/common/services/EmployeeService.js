import Api from '../helpers/Api';

class EmployeeService {
    getEmployees() {
        return Api.get(`/funcionarios`);
    }

    getEmployee(id) {
        return Api.get(`/funcionarios/${id}`);
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
