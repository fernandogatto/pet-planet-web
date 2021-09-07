import TourRequestService from '../../services/TourRequestService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const TourRequestOperations = {
    getTourRequests: () => async () => {
        try {
            const response = await TourRequestService.getTourRequests();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getTourRequestByUserId: (user_id) => async () => {
        try {
            const response = await TourRequestService.getTourRequestByUserId(user_id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    postTourRequest: (data) => async () => {
        try {
            const response = await TourRequestService.postTourRequest(data);

            Toast.showSuccess('Pedido de passeio feito com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updateTourRequestById: (id, data) => async () => {
        try {
            const response = await TourRequestService.updateTourRequestById(id, data);

            Toast.showSuccess('Pedido de passeio atualizado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deleteTourRequestById: (id) => async () => {
        try {
            const response = await TourRequestService.deleteTourRequestById(id);

            Toast.showSuccess('Pedido de passeio excluído com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default TourRequestOperations;
