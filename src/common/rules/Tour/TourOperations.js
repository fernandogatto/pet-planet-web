import TourService from '../../services/TourService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const TourOperations = {
    getTours: () => async () => {
        try {
            const response = await TourService.getTours();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getTour: (id) => async () => {
        try {
            const response = await TourService.getTour(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    createTour: (data) => async () => {
        try {
            const response = await TourService.createTour(data);

            Toast.showSuccess('Passeio criado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updateTourById: (id, data) => async () => {
        try {
            const response = await TourService.updateTourById(id, data);

            Toast.showSuccess('Passeio atualizado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deleteTourById: (id) => async () => {
        try {
            const response = await TourService.deleteTourById(id);

            Toast.showSuccess('Passeio excluído com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default TourOperations;
