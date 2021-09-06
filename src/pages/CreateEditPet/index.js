import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
    Box,
    Tooltip,
    IconButton,
    TextField,
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
    ContainerCreateEditPet,
    ContentCreateEditPet,
} from './styles';

import Menu from '../../components/Menu';

import LoadingForm from '../../components/Loadings/LoadingForm';

import PetOperations from '../../common/rules/Pet/PetOperations';

const CreateEditPet = ({ match }) => {
    const { id } = match.params;

    const dispatch = useDispatch();

    const history = useHistory();

    const [pet, setPet] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [hasError, setHasError] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);

    const [inputTextData, setInputTextData] = useState({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        descricao: '',
        imagem: '',
    });

    const [inputSelectData, setInputSelectData] = useState({
        porte: '',
        sexo: '',
    });

    const [inputError, setInputError] = useState({
        nome: false,
        especie: false,
        raca: false,
        idade: false,
        porte: false,
        descricao: false,
        imagem: false,
        sexo: false,
    });

    useEffect(() => {
        if (id) {
            getPet();
        }
    }, []);

    const getPet = async () => {
        try {
            setIsUpdate(true);

            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(PetOperations.getPet(id));

            setIsLoading(false);

            setPet(response);

            setInputTextData({
                nome: response.nome,
                especie: response.sexo,
                raca: response.raca,
                idade: response.idade,
                descricao: response.descricao,
                imagem: response.imagem,
            });

            setInputSelectData({
                porte: response.porte,
                sexo: response.sexo,
            });
        } catch (err) {
            console.log('getPet', err);

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
                especie,
                raca,
                idade,
                descricao,
                imagem,
            } = inputTextData;

            const {
                porte,
                sexo,
            } = inputSelectData;

            setInputError({
                nome: nome === '' ? true : false,
                especie: especie === '' ? true : false,
                raca: raca === '' ? true : false,
                idade: idade === '' ? true : false,
                descricao: descricao === '' ? true : false,
                imagem: imagem === '' ? true : false,
                porte: porte === '' ? true : false,
                sexo: sexo === '' ? true : false,
            });

            if (
                nome !== '' &&
                especie !== '' &&
                raca !== '' &&
                idade !== '' &&
                descricao !== '' &&
                imagem !== '' &&
                porte !== '' &&
                sexo !== ''
            ) {
                const data = {
                    nome,
                    especie,
                    raca,
                    idade,
                    descricao,
                    imagem,
                    porte,
                    sexo,
                };

                setIsSubmiting(true);

                await isUpdate
                    ? dispatch(PetOperations.updatePetById(id, data))
                    : dispatch(PetOperations.createPet(data));

                setIsSubmiting(false);

                history.goBack();
            }
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerCreateEditPet>
            <Menu />

            <Box className="container-page">
                <ContentCreateEditPet>
                    <Box className="container-back-page">
                        <Tooltip title="Voltar" arrow>
                            <IconButton
                                aria-label="Voltar página"
                                component={Link}
                                to="/adoption"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <h1>{isUpdate ? 'Editar': 'Cadastrar'} pet</h1>
                    </Box>

                    <LoadingForm
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getPet}
                    />

                    {(!isUpdate ||
                        (!isLoading && !hasError && pet && pet.nome !== '')) && (
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

                                        <TextField
                                            required
                                            error={inputError.raca}
                                            variant="outlined"
                                            type="text"
                                            name="raca"
                                            label="Raça"
                                            fullWidth
                                            value={inputTextData.raca}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.raca && 'Campo obrigatório'}
                                        />

                                        <TextField
                                            required
                                            error={inputError.idade}
                                            variant="outlined"
                                            type="text"
                                            name="idade"
                                            label="Idade"
                                            fullWidth
                                            value={inputTextData.idade}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.idade && 'Campo obrigatório'}
                                        />

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

                                        <FormControl
                                            required
                                            error={inputError.sexo}
                                            variant="outlined"
                                            fullWidth
                                            className="input"
                                        >
                                            <InputLabel htmlFor="sexo">
                                                Sexo
                                            </InputLabel>

                                            <Select
                                                value={inputSelectData.sexo}
                                                onChange={handleSelectChange}
                                                label="Porte"
                                                name="sexo"
                                                disabled={isSubmiting}
                                            >
                                                <MenuItem
                                                    value="Fêmea"
                                                >
                                                    Fêmea
                                                </MenuItem>
                                                <MenuItem
                                                    value="Macho"
                                                >
                                                    Macho
                                                </MenuItem>
                                            </Select>

                                            {inputError.sexo && (
                                                <FormHelperText>
                                                    Campo obrigatório
                                                </FormHelperText>
                                            )}
                                        </FormControl>

                                        <TextField
                                            required
                                            error={inputError.descricao}
                                            multiline
                                            minRows={5}
                                            maxRows={5}
                                            variant="outlined"
                                            type="text"
                                            name="descricao"
                                            label="Descrição"
                                            fullWidth
                                            value={inputTextData.descricao}
                                            onChange={handleInputTextChange}
                                            disabled={isSubmiting}
                                            className="input"
                                            helperText={inputError.descricao && 'Campo obrigatório'}
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
                </ContentCreateEditPet>
            </Box>
        </ContainerCreateEditPet>
    )
};

export default CreateEditPet;
