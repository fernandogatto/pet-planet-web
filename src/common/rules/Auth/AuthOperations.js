import Api from '../../helpers/Api';

import AuthActions from './AuthActions';

import AuthService from '../../services/AuthService';

import CustomerService from '../../services/CustomerService';

import Toast from '../../helpers/Toast';

import Storage from '../../constants/Storage';

import { getErrorMessage } from '../../handlers/ErrorHandler';

const AuthOperations = {
    getUserAuth: () => async (dispatch) => {
        dispatch(AuthActions.SetLoading());

        try {
            const user = localStorage.getItem(`@${Storage.project}:user`);

            if (user) {
                dispatch(AuthActions.SetSuccess(user));
            }
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            dispatch(AuthActions.SetFailure());
        }
    },
    createAuth: (data) => async () => {
        try {
            const customers = await CustomerService.getCustomers();

            const user = customers.data
                .find(item => item.email === data.email && item.senha === data.senha);

            console.log('user', user)

            if (!user) {
                const number = 0;

                console.log('E-mail ou senha inválido');

                number.replace("-",""); // You can't replace a int
            }

            await AuthService.createAuth(data);

            localStorage.setItem(`@${Storage.project}:user`, JSON.stringify(user));

            Api.defaults.headers.authorization = `Bearer ${user}`;

            Toast.showSuccess('Login feito com sucesso');

            return user;
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            throw error;
        }
    },
    removeAuth: () => async (dispatch) => {
        dispatch(AuthActions.SetLoading());

        try {
            // await AuthService.removeAuth();

            localStorage.removeItem(`@${Storage.project}:user`);

            Toast.showSuccess('Logout feito com sucesso');

            dispatch(AuthActions.SetSuccess({}));

            return {};
        } catch (error) {
            Toast.showError(getErrorMessage(error));

            dispatch(AuthActions.SetFailure());
        }
    },
}

export default AuthOperations;
