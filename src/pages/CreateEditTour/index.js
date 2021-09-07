import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import InputMask from 'react-input-mask';

import {
    Box,
    Tooltip,
    IconButton,
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
    ContainerCreateEditTour,
    ContentCreateEditTour,
} from './styles';

import Menu from '../../components/Menu';

import LoadingForm from '../../components/Loadings/LoadingForm';

import LoadingInput from '../../components/Loadings/LoadingInput'

import HasErrorInput from '../../components/Errors/HasErrorInput';

import EmployeeOperations from '../../common/rules/Employee/EmployeeOperations';

import TourOperations from '../../common/rules/Tour/TourOperations';

const CreateEditTour = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const history = useHistory();

    const [employees, setEmployees] = useState([]);

    const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);

    const [hasErrorEmployees, setHasErrorEmployees] = useState(false);

    const [tour, setTour] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [hasError, setHasError] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const [inputTextData, setInputTextData] = useState({
        valor: '',
    });

    const [inputSelectData, setInputSelectData] = useState({
        funcionario: '',
    });

    const [inputError, setInputError] = useState({
        valor: false,
        funcionario: false,
    });

    useEffect(() => {
        getEmployees();

        if (id) {
            getTour();
        }
    }, []);

    const getEmployees = async () => {
        try {
            setIsLoadingEmployees(true);

            setHasErrorEmployees(false);

            const response = await dispatch(EmployeeOperations.getEmployees());

            setIsLoadingEmployees(false);

            setEmployees(response);
        } catch (err) {
            console.log('getEmployees', err);

            setIsLoadingEmployees(false);

            setHasErrorEmployees(true);
        }
    }

    const getTour = async () => {
        try {
            setIsUpdate(true);

            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(TourOperations.getTour(id));

            setIsLoading(false);

            setTour(response);

            setInputTextData({
                valor: response.valor,
            });

            setInputSelectData({
                funcionario: response.funcionario.id,
            });
        } catch (err) {
            console.log('getTour', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({ ...inputTextData, [name]: value });
    }

    const handleSelectChange = (event) => {
        const { name, value } = event.target;

        setInputSelectData({ ...inputSelectData, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            const {
                valor,
            } = inputTextData;

            const {
                funcionario,
            } = inputSelectData;

            setInputError({
                valor: valor === '' ? true : false,
                funcionario: funcionario === '' ? true : false,
            });

            if (
                valor !== '' &&
                funcionario !== ''
            ) {
                const data = {
                    valor,
                    funcionario: employees.find(item => item.id === funcionario),
                };

                setIsSubmiting(true);

                isUpdate
                    ? await dispatch(TourOperations.updateTourById(id, data))
                    : await dispatch(TourOperations.createTour(data));

                setIsSubmiting(false);

                history.goBack();
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerCreateEditTour>
            <Menu />

            <Box className="container-page">
                <ContentCreateEditTour>
                    <Box className="container-back-page">
                        <Tooltip title="Voltar" arrow>
                            <IconButton
                                aria-label="Voltar página"
                                component={Link}
                                to="/tours"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <h1>{isUpdate ? 'Editar': 'Cadastrar'} passeio</h1>
                    </Box>

                    <LoadingForm
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getTour}
                    />

                    {(!isUpdate ||
                        (!isLoading && !hasError && tour && tour.valor !== '')) && (
                            <Box className="container-form">
                                <Box className="container-section container-flex">
                                    <Box className="item-flex">
                                        <FormControl
                                            required
                                            error={inputError.valor}
                                            variant="outlined"
                                            fullWidth
                                            className="input"
                                        >
                                            <InputLabel htmlFor="outlined-adornment-price">
                                                Valor
                                            </InputLabel>

                                            <OutlinedInput
                                                id="outlined-adornment-price"
                                                type="text"
                                                name="valor"
                                                labelWidth={60}
                                                value={inputTextData.valor}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        R$
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                        {hasErrorEmployees && (
                                            <HasErrorInput />
                                        )}

                                        {isLoadingEmployees && (
                                            <LoadingInput />
                                        )}

                                        {!isLoadingEmployees &&
                                            !hasErrorEmployees &&
                                            employees && (
                                                <FormControl
                                                    required
                                                    error={inputError.funcionario}
                                                    variant="outlined"
                                                    fullWidth
                                                    className="input"
                                                >
                                                    <InputLabel htmlFor="funcionario">
                                                        Funcionário
                                                    </InputLabel>

                                                    <Select
                                                        value={inputSelectData.funcionario}
                                                        onChange={handleSelectChange}
                                                        label="Funcionário"
                                                        name="funcionario"
                                                        disabled={isSubmiting}
                                                    >
                                                        {employees.length > 0 &&
                                                            employees.map(item => (
                                                                <MenuItem
                                                                    key={item.id}
                                                                    value={item.id}
                                                                >
                                                                    {item.nome}
                                                                </MenuItem>
                                                        ))}
                                                    </Select>

                                                    {inputError.funcionario && (
                                                        <FormHelperText>
                                                            Campo obrigatório
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            )}
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
                </ContentCreateEditTour>
            </Box>
        </ContainerCreateEditTour>
    )
};

export default CreateEditTour;
