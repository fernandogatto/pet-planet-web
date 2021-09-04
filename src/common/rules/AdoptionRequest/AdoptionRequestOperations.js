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

    getAdoptionRequest: (id) => async () => {
        try {
            const response = await AdoptionRequestService.getAdoptionRequest(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    postAdoptionRequest: (data) => async () => {
        try {
            const response = await AdoptionRequestService.postAdoptionRequest(data);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default AdoptionRequestOperations;
