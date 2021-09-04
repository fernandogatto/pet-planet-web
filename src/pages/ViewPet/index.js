import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
    Box,
    Tooltip,
    IconButton,
    Button,
    CircularProgress,
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';

import {
    ContainerViewPet,
    ContentViewPet,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import SuccessDialog from '../../components/Dialogs/SuccessDialog';

import PetOperations from '../../common/rules/Pet/PetOperations';

import AdoptionRequestOperations from '../../common/rules/AdoptionRequest/AdoptionRequestOperations';

const ViewPet = ({ match }) => {
    const { id } = match.params;

    const history = useHistory();

    const dispatch = useDispatch();

    const { user } = useAuth();

    const [pet, setPet] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        getPet();
    }, []);

    const getPet = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(PetOperations.getPet(id));

            setIsLoading(false);

            setPet(response);
        } catch (err) {
            console.log('getPet', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    const handleSubmit = async () => {
        try {
            const data = {
                pet_id: id,
                client_id: user.id,
            };

            setIsSubmiting(true);

            await dispatch(AdoptionRequestOperations.postAdoptionRequest(data));

            setIsSubmiting(false);

            setDialogIsOpen(true);
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerViewPet>
            <Menu />

            <SuccessDialog
                dialogOpen={dialogIsOpen}
                handleCloseDialog={() => {
                    setDialogIsOpen(false);

                    history.goBack();
                }}
                title="Sucesso"
                message="Pedido de adoção feito com sucesso!"
            />

            <Box className="container-page">
                <ContentViewPet>
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

                        <h1>Adoção</h1>
                    </Box>

                    {!isLoading && !hasError && pet && pet.nome !== '' && (
                        <Box className="container-info">
                            <Box className="container-image">
                                <img
                                    src={pet.imagem}
                                    alt={pet.nome}
                                />
                            </Box>

                            <Box className="container-description">
                                <Box className="container-title">
                                    <h2>{pet.nome}</h2>
                                </Box>

                                <Box className="container-registry">
                                    <p>Espécie: {pet.especie}</p>

                                    <p>Sexo: {pet.sexo}</p>

                                    <p>Idade: {pet.idade}</p>

                                    <p>Porte: {pet.porte}</p>
                                </Box>

                                <Box className="container-registry">
                                    <p>{pet.descricao}</p>
                                </Box>

                                <Box mt={2} className="grid-button">
                                    <Box className="wrapper">
                                        {isSubmiting && (
                                            <CircularProgress
                                                className="circular-progress"
                                                style={{ width: 24, height: 24 }}
                                            />
                                        )}

                                        <Button
                                            aria-label="Pedido de adoção"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={isSubmiting}
                                            onClick={handleSubmit}
                                        >
                                            Adotar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </ContentViewPet>
            </Box>
        </ContainerViewPet>
    )
};

export default ViewPet;
