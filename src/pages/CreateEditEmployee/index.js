import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import InputMask from 'react-input-mask';

import {
    Box,
    Tooltip,
    IconButton,
    TextField,
    OutlinedInput,
    InputAdornment,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';

import {
    ContainerCreateEditEmployee,
    ContentCreateEditEmployee,
} from './styles';

import Menu from '../../components/Menu';

import LoadingForm from '../../components/Loadings/LoadingForm';

import ListaEstados from '../../common/schemas/Estados';

import ListaCidades from '../../common/schemas/Cidades';

import EmployeeOperations from '../../common/rules/Employee/EmployeeOperations';

const CreateEditEmployee = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const history = useHistory();

    const [employee, setEmployee] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [hasError, setHasError] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const [inputTextData, setInputTextData] = useState({
        nome: '',
        celular: '',
        email: '',
    });

    const [inputError, setInputError] = useState({
        nome: false,
        celular: false,
        tamanhoCelular: false,
        email: false,
    });

    useEffect(() => {
        if (id) {
            getEmployee();
        }
    }, []);

    const getEmployee = async () => {
        try {
            setIsUpdate(true);

            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(EmployeeOperations.getEmployee(id));

            setIsLoading(false);

            setEmployee(response);

            setInputTextData({
                nome: response.nome,
                celular: response.celular,
                email: response.email,
            });
        } catch (err) {
            console.log('getEmployee', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({ ...inputTextData, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            const {
                nome,
                celular,
                email,
            } = inputTextData;

            setInputError({
                nome: nome === '' ? true : false,
                celular: celular === '' ? true : false,
                tamanhoCelular: celular.length < 14 ? true : false,
                email: email === '' ? true : false,
            });

            if (
                nome !== '' &&
                celular !== '' &&
                !inputError.tamanhoCelular < 14 &&
                email !== ''
            ) {
                const data = {
                    nome,
                    celular: celular.replace(/[^0-9]+/g, ''),
                    email,
                };

                setIsSubmiting(true);

                await isUpdate
                    ? dispatch(EmployeeOperations.updateEmployeeById(id, data))
                    : dispatch(EmployeeOperations.createEmployee(data));

                setIsSubmiting(false);

                history.goBack();
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerCreateEditEmployee>
            <Menu />

            <Box className="container-page">
                <ContentCreateEditEmployee>
                    <Box className="container-back-page">
                        <Tooltip title="Voltar" arrow>
                            <IconButton
                                aria-label="Voltar página"
                                component={Link}
                                to="/employees"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <h1>{isUpdate ? 'Editar': 'Cadastrar'} funcionário</h1>
                    </Box>

                    <LoadingForm
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getEmployee}
                    />

                    {(!isUpdate ||
                        (!isLoading && !hasError && employee && employee.nome !== '')) && (
                            <Box className="container-form">
                                <Box className="container-section container-flex">
                                    <Box className="item-flex">
                                        <TextField
                                            required
                                            error={inputError.nome}
                                            variant="outlined"
                                            type="text"
                                            name="nome"
                                            label="Nome"
                                            fullWidth
                                            value={inputTextData.nome}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.nome && 'Campo obrigatório'}
                                        />

                                        <TextField
                                            required
                                            error={inputError.email}
                                            variant="outlined"
                                            type="email"
                                            name="email"
                                            label="E-mail"
                                            fullWidth
                                            value={inputTextData.email}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.email && 'Campo obrigatório'}
                                        />

                                        <InputMask
                                            mask={inputTextData.celular.length > 14 ? "(99) 99999-9999" : "(99) 9999-99999"}
                                            maskChar=""
                                            fullWidth
                                            value={inputTextData.celular}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                        >
                                            {() => (
                                                <TextField
                                                    required
                                                    error={inputError.celular || inputError.tamanhoCelular}
                                                    variant="outlined"
                                                    type="tel"
                                                    label="Celular"
                                                    name="celular"
                                                    fullWidth
                                                    className="input"
                                                    helperText={
                                                        (inputError.celular && 'Campo obrigatório') ||
                                                        (inputError.tamanhoCelular && 'Celular inválido')
                                                    }
                                                />
                                            )}
                                        </InputMask>
                                    </Box>
                                </Box>

                                <Box className="grid-button">
                                    <Box className="wrapper">
                                        {isSubmiting && (
                                            <CircularProgress
                                                className="circular-progress"
                                                style={{ width: 24, height: 24 }}
                                            />
                                        )}

                                        <Button
                                            aria-label="Submeter formulário"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={isSubmiting}
                                            onClick={handleSubmit}
                                        >
                                            {isUpdate ? 'Atualizar' : 'Salvar'}
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                    )}
                </ContentCreateEditEmployee>
            </Box>
        </ContainerCreateEditEmployee>
    )
};

export default CreateEditEmployee;
