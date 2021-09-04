import CustomerService from '../../services/CustomerService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const CustomerOperations = {
    getCustomers: () => async () => {
        try {
            const response = await CustomerService.getCustomers();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default CustomerOperations;
