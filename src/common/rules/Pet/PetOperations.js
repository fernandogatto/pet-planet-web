import PetService from '../../services/PetService';

import Toast from '../../helpers/Toast';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const PetOperations = {
    getPets: () => async () => {
        try {
            const response = await PetService.getPets();

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default PetOperations;
