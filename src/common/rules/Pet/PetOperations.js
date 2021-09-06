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

    getPet: (id) => async () => {
        try {
            const response = await PetService.getPet(id);

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    createPet: (data) => async () => {
        try {
            const response = await PetService.createPet(data);

            Toast.showSuccess('Pet criado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    updatePetById: (id, data) => async () => {
        try {
            const response = await PetService.updatePetById(id, data);

            Toast.showSuccess('Pet atualizado com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },

    deletePetById: (id) => async () => {
        try {
            const response = await PetService.deletePetById(id);

            Toast.showSuccess('Pet excluído com sucesso');

            return response.data;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
}

export default PetOperations;
