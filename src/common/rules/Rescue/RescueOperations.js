import RescueService from '../../services/RescueService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const RescueOperations = {
    getRescues: () => async () => {
        try {
            const response = await RescueService.getRescues();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getRescue: (id) => async () => {
        try {
            const response = await RescueService.getRescue(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    postRescue: (data) => async () => {
        try {
            const response = await RescueService.postRescue(data);

            Toast.showSuccess('Pedido de resgate cadastrado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default RescueOperations;
