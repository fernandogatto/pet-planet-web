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
}

export default HotelOperations;
