import AdoptionRequestService from '../../services/AdoptionRequestService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const AdoptionRequestOperations = {
    getAdoptionRequests: () => async () => {
        try {
            const response = await AdoptionRequestService.getAdoptionRequests();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getAdoptionRequestByUserId: (user_id) => async () => {
        try {
            const response = await AdoptionRequestService.getAdoptionRequestByUserId(user_id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    postAdoptionRequest: (data) => async () => {
        try {
            const response = await AdoptionRequestService.postAdoptionRequest(data);

            Toast.showSuccess('Pedido de adoção feito com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updateAdoptionRequestById: (id, data) => async () => {
        try {
            const response = await AdoptionRequestService.updateAdoptionRequestById(id, data);

            Toast.showSuccess('Pedido de adoção atualizado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deleteAdoptionRequestById: (id) => async () => {
        try {
            const response = await AdoptionRequestService.deleteAdoptionRequestById(id);

            Toast.showSuccess('Pedido de adoção excluído com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default AdoptionRequestOperations;
