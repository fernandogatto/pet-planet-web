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

    getReserve: (id) => async () => {
        try {
            const response = await ReserveService.getReserve(id);

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
}

export default ReserveOperations;
