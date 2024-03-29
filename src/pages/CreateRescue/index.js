import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import InputMask from 'react-input-mask';

import {
    Box,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import DateLocale from 'date-fns/locale/pt-BR';

import {
    ContainerRescue,
    ContentRescue,
} from './styles';

import Menu from '../../components/Menu';

import ListaEstados from '../../common/schemas/Estados';

import ListaCidades from '../../common/schemas/Cidades';

import RescueOperations from '../../common/rules/Rescue/RescueOperations';

const CreateRescue = () => {
    const dispatch = useDispatch();

    const [inputTextData, setInputTextData] = useState({
        celular: '',
        especie: '',
        observacao: '',
        logradouro: '',
        numero: 0,
        bairro: '',
    });

    const [inputDateData, setInputDateData] = useState({
        dataHorario: new Date(),
    });

    const [inputSelectData, setInputSelectData] = useState({
        porte: '',
        estado: '',
        municipio: '',
    });

    const [inputError, setInputError] = useState({
        celular: false,
        celularInvalido: false,
        especie: false,
        porte: false,
        logradouro: false,
        numero: false,
        bairro: false,
        observacao: false,
    });

    const [isSubmiting, setIsSubmiting] = useState(false);

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({ ...inputTextData, [name]: value });
    }

    const handleDateChange = (date, name) => {
        setInputDateData({ ...inputDateData, [name]: date });
    }

    const handleSelectChange = (event) => {
        const { name, value } = event.target;

        setInputSelectData({ ...inputSelectData, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            const {
                celular,
                especie,
                observacao,
                logradouro,
                numero,
                bairro,
            } = inputTextData;

            const { dataHorario } = inputDateData;

            const {
                porte,
                estado,
                municipio,
            } = inputSelectData;

            setInputError({
                celular: celular === '' ? true : false,
                celularInvalido: celular.length < 14 ? true : false,
                especie: especie === '' ? true : false,
                porte: porte === '' ? true : false,
                estado: estado === '' ? true : false,
                municipio: municipio === '' ? true : false,
                logradouro: logradouro === '' ? true : false,
                numero: (numero === 0 || numero < 0) ? true : false,
                bairro: bairro === '' ? true : false,
                observacao: observacao === '' ? true : false,
            });

            if (
                celular !== '' &&
                !inputError.celularInvalido &&
                especie !== '' &&
                porte !== '' &&
                estado !== '' &&
                municipio !== '' &&
                logradouro !== '' &&
                numero > 0 &&
                bairro !== '' &&
                observacao !== ''
            ) {
                const data = {
                    celular,
                    dataHorario,
                    especie,
                    porte,
                    observacao,
                    estado,
                    municipio,
                    logradouro,
                    numero: Number(numero),
                    bairro,
                };

                setIsSubmiting(true);

                await dispatch(RescueOperations.postRescue(data));

                setIsSubmiting(false);
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerRescue>
            <Menu />

            <Box className="container-page">
                <ContentRescue>
                    <Box className="container-header-page">
                        <h1>Resgate</h1>
                    </Box>

                    <Box className="container-form">
                        <Box className="container-section container-flex">
                            <Box className="item-flex">
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={DateLocale}
                                >
                                    <DateTimePicker
                                        autoOk
                                        fullWidth
                                        ampm={false}
                                        inputVariant="outlined"
                                        orientation="portrait"
                                        name="dataHorario"
                                        label="Data"
                                        format="dd/MM/yyyy 'às' HH:mm"
                                        value={inputDateData.dataHorario}
                                        onChange={(value) => handleDateChange(value, 'dataHorario')}
                                        disabled={isSubmiting}
                                        className="input"
                                    />
                                </MuiPickersUtilsProvider>

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
                                            error={inputError.celular || inputError.celularInvalido}
                                            variant="outlined"
                                            type="tel"
                                            label="Celular"
                                            name="celular"
                                            fullWidth
                                            className="input"
                                            helperText={
                                                (inputError.celular && 'Campo obrigatório') ||
                                                (inputError.celularInvalido && 'Telefone inválido')
                                            }
                                        />
                                    )}
                                </InputMask>

                                <TextField
                                    required
                                    error={inputError.especie}
                                    variant="outlined"
                                    type="text"
                                    name="especie"
                                    label="Espécie"
                                    fullWidth
                                    value={inputTextData.especie}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                    className="input"
                                    helperText={inputError.especie && 'Campo obrigatório'}
                                />

                                <FormControl
                                    required
                                    error={inputError.porte}
                                    variant="outlined"
                                    fullWidth
                                    className="input"
                                >
                                    <InputLabel htmlFor="porte">
                                        Porte
                                    </InputLabel>

                                    <Select
                                        value={inputSelectData.porte}
                                        onChange={handleSelectChange}
                                        label="Porte"
                                        name="porte"
                                        disabled={isSubmiting}
                                    >
                                        <MenuItem
                                            value="Pequeno"
                                        >
                                            Pequeno
                                        </MenuItem>
                                        <MenuItem
                                            value="Médio"
                                        >
                                            Médio
                                        </MenuItem>
                                        <MenuItem
                                            value="Grande"
                                        >
                                            Grande
                                        </MenuItem>
                                    </Select>

                                    {inputError.porte && (
                                        <FormHelperText>
                                            Campo obrigatório
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <TextField
                                    required
                                    error={inputError.observacao}
                                    multiline
                                    minRows={5}
                                    maxRows={5}
                                    variant="outlined"
                                    type="text"
                                    name="observacao"
                                    label="Observação"
                                    fullWidth
                                    value={inputTextData.observacao}
                                    onChange={handleInputTextChange}
                                    disabled={isSubmiting}
                                    className="input"
                                    helperText={inputError.observacao && 'Campo obrigatório'}
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
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </ContentRescue>
            </Box>
        </ContainerRescue>
    )
};

export default CreateRescue;
