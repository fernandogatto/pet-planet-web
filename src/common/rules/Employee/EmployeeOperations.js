import EmployeeService from '../../services/EmployeeService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const EmployeeOperations = {
    getEmployees: () => async () => {
        try {
            const response = await EmployeeService.getEmployees();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getEmployee: (id) => async () => {
        try {
            const response = await EmployeeService.getEmployee(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    createEmployee: (data) => async () => {
        try {
            const response = await EmployeeService.createEmployee(data);

            Toast.showSuccess('Funcionário criado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updateEmployeeById: (id, data) => async () => {
        try {
            const response = await EmployeeService.updateEmployeeById(id, data);

            Toast.showSuccess('Funcionário atualizado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deleteEmployeeById: (id) => async () => {
        try {
            const response = await EmployeeService.deleteEmployeeById(id);

            Toast.showSuccess('Funcionário excluído com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default EmployeeOperations;
