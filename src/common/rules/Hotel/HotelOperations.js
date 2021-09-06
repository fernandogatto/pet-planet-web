import HotelService from '../../services/HotelService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const HotelOperations = {
    getHotels: () => async () => {
        try {
            const response = await HotelService.getHotels();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    getHotel: (id) => async () => {
        try {
            const response = await HotelService.getHotel(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    createHotel: (data) => async () => {
        try {
            const response = await HotelService.createHotel(data);

            Toast.showSuccess('Hotel criado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updateHotelById: (id, data) => async () => {
        try {
            const response = await HotelService.updateHotelById(id, data);

            Toast.showSuccess('Hotel atualizado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deleteHotelById: (id) => async () => {
        try {
            const response = await HotelService.deleteHotelById(id);

            Toast.showSuccess('Hotel excluído com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default HotelOperations;
