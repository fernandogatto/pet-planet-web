import ReserveService from '../../services/ReserveService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const ReserveOperations = {
    getReserves: () => async () => {
        try {
            const response = await ReserveService.getReserves();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getReserveByUserId: (id) => async () => {
        try {
            const response = await ReserveService.getReserveByUserId(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    postReserve: (data) => async () => {
        try {
            const response = await ReserveService.postReserve(data);

            Toast.showSuccess('Reserva feita com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updateReserveById: (id, data) => async () => {
        try {
            const response = await ReserveService.updateReserveById(id, data);

            Toast.showSuccess('Reserva atualizada com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deleteReserveById: (id) => async () => {
        try {
            const response = await ReserveService.deleteReserveById(id);

            Toast.showSuccess('Reserva excluída com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default ReserveOperations;
