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
    ContainerCreateEditHotel,
    ContentCreateEditHotel,
} from './styles';

import Menu from '../../components/Menu';

import LoadingForm from '../../components/Loadings/LoadingForm';

import ListaEstados from '../../common/schemas/Estados';

import ListaCidades from '../../common/schemas/Cidades';

import HotelOperations from '../../common/rules/Hotel/HotelOperations';

const CreateEditHotel = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const history = useHistory();

    const [hotel, setHotel] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [hasError, setHasError] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const [inputTextData, setInputTextData] = useState({
        nome: '',
        logradouro: '',
        numero: 0,
        bairro: '',
        telefone: '',
        diaria: '',
        imagem: '',
    });

    const [inputSelectData, setInputSelectData] = useState({
        municipio: '',
        estado: '',
    });

    const [inputError, setInputError] = useState({
        nome: false,
        logradouro: false,
        numero: false,
        bairro: false,
        telefone: false,
        telefoneInvalido: false,
        diaria: false,
        imagem: false,
        municipio: false,
        estado: false,
    });

    useEffect(() => {
        if (id) {
            getHotel();
        }
    }, []);

    const getHotel = async () => {
        try {
            setIsUpdate(true);

            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(HotelOperations.getHotel(id));

            setIsLoading(false);

            setHotel(response);

            setInputTextData({
                nome: response.nome,
                logradouro: response.logradouro,
                numero: response.numero,
                bairro: response.bairro,
                telefone: response.telefone,
                diaria: response.diaria,
                imagem: response.imagem,
            });

            setInputSelectData({
                municipio: response.municipio,
                estado: response.estado,
            });
        } catch (err) {
            console.log('getHotel', err);

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
                nome,
                telefone,
                diaria,
                imagem,
                logradouro,
                numero,
                bairro,
            } = inputTextData;

            const {
                municipio,
                estado,
            } = inputSelectData;

            setInputError({
                nome: nome === '' ? true : false,
                telefone: telefone === '' ? true : false,
                telefoneInvalido: telefone.length < 14 ? true : false,
                diaria: diaria === '' ? true : false,
                imagem: imagem === '' ? true : false,
                logradouro: logradouro === '' ? true : false,
                numero: numero === '' ? true : false,
                bairro: bairro === '' ? true : false,
                municipio: municipio === '' ? true : false,
                estado: estado === '' ? true : false,
            });

            if (
                nome !== '' &&
                telefone !== '' &&
                !inputError.telefoneInvalido &&
                diaria !== '' &&
                imagem !== '' &&
                logradouro !== '' &&
                numero > 0 &&
                bairro !== '' &&
                municipio !== '' &&
                estado !== ''
            ) {
                const data = {
                    nome,
                    telefone: telefone.replace(/[^0-9]+/g, ''),
                    diaria,
                    imagem,
                    logradouro,
                    numero,
                    bairro,
                    municipio,
                    estado,
                };

                setIsSubmiting(true);

                await isUpdate
                    ? dispatch(HotelOperations.updateHotelById(id, data))
                    : dispatch(HotelOperations.createHotel(data));

                setIsSubmiting(false);

                history.goBack();
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerCreateEditHotel>
            <Menu />

            <Box className="container-page">
                <ContentCreateEditHotel>
                    <Box className="container-back-page">
                        <Tooltip title="Voltar" arrow>
                            <IconButton
                                aria-label="Voltar página"
                                component={Link}
                                to="/accommodation"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <h1>{isUpdate ? 'Editar': 'Cadastrar'} hotel</h1>
                    </Box>

                    <LoadingForm
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getHotel}
                    />

                    {(!isUpdate ||
                        (!isLoading && !hasError && hotel && hotel.nome !== '')) && (
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

                                        <InputMask
                                            mask={inputTextData.telefone.length > 14 ? "(99) 99999-9999" : "(99) 9999-99999"}
                                            maskChar=""
                                            fullWidth
                                            value={inputTextData.telefone}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                        >
                                            {() => (
                                                <TextField
                                                    required
                                                    error={inputError.telefone || inputError.telefoneInvalido}
                                                    variant="outlined"
                                                    type="tel"
                                                    label="Telefone"
                                                    name="telefone"
                                                    fullWidth
                                                    className="input"
                                                    helperText={
                                                        (inputError.telefone && 'Campo obrigatório') ||
                                                        (inputError.telefoneInvalido && 'Telefone inválido')
                                                    }
                                                />
                                            )}
                                        </InputMask>

                                        <FormControl
                                            required
                                            error={inputError.diaria}
                                            variant="outlined"
                                            fullWidth
                                            className="input"
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password">
                                                Diária
                                            </InputLabel>

                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type="text"
                                                name="diaria"
                                                labelWidth={60}
                                                value={inputTextData.diaria}
                                                onChange={handleInputTextChange}
                                                disabled={isSubmiting}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        R$
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>

                                        <TextField
                                            required
                                            error={inputError.imagem}
                                            variant="outlined"
                                            type="text"
                                            name="imagem"
                                            label="Imagem"
                                            fullWidth
                                            value={inputTextData.imagem}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.imagem && 'Campo obrigatório'}
                                            placeholder="Insira a url de uma imagem"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Box>

                                    <Box className="item-flex">
                                        <FormControl
                                            required
                                            error={inputError.estado}
                                            variant="outlined"
                                            fullWidth
                                            className="input"
                                        >
                                            <InputLabel htmlFor="estado">
                                                Estado
                                            </InputLabel>

                                            <Select
                                                value={inputSelectData.estado}
                                                onChange={handleSelectChange}
                                                label="Estado"
                                                name="estado"
                                                disabled={isSubmiting}
                                            >
                                                {Object.keys(ListaEstados).map(key => (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {ListaEstados[key]}
                                                    </MenuItem>
                                                ))}
                                            </Select>

                                            {inputError.estado && (
                                                <FormHelperText>
                                                    Campo obrigatório
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <FormControl
                                            required
                                            error={inputError.municipio}
                                            variant="outlined"
                                            fullWidth
                                            className="input"
                                        >
                                            <InputLabel htmlFor="municipio">
                                                Cidade
                                            </InputLabel>

                                            <Select
                                                value={inputSelectData.municipio}
                                                onChange={handleSelectChange}
                                                label="Cidade"
                                                name="municipio"
                                                disabled={isSubmiting}
                                            >
                                                {inputSelectData.estado &&
                                                    ListaCidades[inputSelectData.estado] &&
                                                    ListaCidades[inputSelectData.estado].map(key => (
                                                        <MenuItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {key}
                                                        </MenuItem>
                                                ))}
                                            </Select>

                                            {inputError.municipio && (
                                                <FormHelperText>
                                                    Campo obrigatório
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <TextField
                                            required
                                            error={inputError.logradouro}
                                            variant="outlined"
                                            type="text"
                                            name="logradouro"
                                            label="Logradouro"
                                            fullWidth
                                            value={inputTextData.logradouro}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.logradouro && 'Campo obrigatório'}
                                        />

                                        <TextField
                                            required
                                            error={inputError.numero}
                                            variant="outlined"
                                            type="number"
                                            name="numero"
                                            label="Número"
                                            fullWidth
                                            inputProps={{ min: 0 }}
                                            min={0}
                                            value={inputTextData.numero}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.numero && 'Campo obrigatório'}
                                        />

                                        <TextField
                                            required
                                            error={inputError.bairro}
                                            variant="outlined"
                                            type="text"
                                            name="bairro"
                                            label="Bairro"
                                            fullWidth
                                            value={inputTextData.bairro}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.bairro && 'Campo obrigatório'}
                                        />
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
                </ContentCreateEditHotel>
            </Box>
        </ContainerCreateEditHotel>
    )
};

export default CreateEditHotel;
