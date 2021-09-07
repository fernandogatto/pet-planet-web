import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    Tooltip,
    IconButton,
} from '@material-ui/core';

import {
    Add,
    Favorite,
    Create,
    Delete,
} from '@material-ui/icons';

import {
    ContainerTour,
    ContentTour,
    ItemCard,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import UserOperations from '../../common/rules/User/UserOperations';

import TourOperations from '../../common/rules/Tour/TourOperations';

import TourRequestOperations from '../../common/rules/TourRequest/TourRequestOperations';

const Tours = () => {
    const dispatch = useDispatch();

    const { user } = useAuth();

    const [tours, setTours] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [client, setClient] = useState({});

    const [isLoadingClient, setIsLoadingClient] = useState(false);

    const [hasErrorClient, setHasErrorClient] = useState(false);

    const [openTourDialog, setOpenTourDialog] = useState(false);

    const [confirmedTour, setConfirmedTour] = useState({});

    const [isSubmitingTour, setIsSubmitingTour] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getTours();

        if (user.role === 'CLIENTE') {
            getUserClient();
        }
    }, []);

    const getTours = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(TourOperations.getTours());

            setIsLoading(false);

            setTours(response);
        } catch (err) {
            console.log('getTours', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    const getUserClient = async () => {
        try {
            setIsLoadingClient(true);

            setHasErrorClient(false);

            const response = await dispatch(UserOperations.getUser(user.uid));

            setIsLoadingClient(false);

            setClient(response);
        } catch (err) {
            console.log('getUserClient', err);

            setIsLoadingClient(false);

            setHasErrorClient(true);
        }
    }

    const handleConfirmTour = (tour) => {
        setConfirmedTour(tour);

        setOpenTourDialog(true);
    }

    const handleMarkTour = async (item) => {
        try {
            const data = {
                passeio: item,
                usuario: client,
            };

            setIsSubmitingTour(true);

            await dispatch(TourRequestOperations.postTourRequest(data));

            setIsSubmitingTour(false);

            setConfirmedTour({});

            setOpenTourDialog(false);
        } catch (err) {
            console.log('handleMarkTour', err);

            setIsSubmitingTour(false);
        }
    }

    const handleConfirmDelete = (id, index) => {
        setDeletedItem({
            id,
            index,
        });

        setOpenConfirmDialog(true);
    }

    const handleDelete = async (item) => {
        let _items = [...tours];

        _items.splice(item.index, 1);

        setTours(_items);

        await dispatch(TourOperations.deleteTourById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerTour>
            <Menu />

            {/* Dialog para confirmar marcação de passeio */}
            <ConfirmDialog
                dialogOpen={openTourDialog}
                handleCloseDialog={() => {
                    setConfirmedTour({});

                    setOpenTourDialog(false);
                }}
                handleConfirmAction={() => {
                    handleMarkTour(confirmedTour);
                }}
                title="Marcar Passeio"
                message="Tem certeza que deseja marcar este funcionário para um passeio?"
                isSubmiting={isSubmitingTour}
            />

            {/* Dialog para confirmar exclusão de passeio */}
            <ConfirmDialog
                dialogOpen={openConfirmDialog}
                handleCloseDialog={() => {
                    setDeletedItem({});

                    setOpenConfirmDialog(false);
                }}
                handleConfirmAction={() => {
                    handleDelete(deletedItem);

                    setOpenConfirmDialog(false);
                }}
                title="Excluir Passeio"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentTour>
                    <Box className="container-header-page">
                        <h1>Passeios</h1>

                        {user.role === 'ADMIN' && (
                            <Tooltip title="Novo passeio" arrow>
                                <IconButton
                                    aria-label="Novo passeio"
                                    component={Link}
                                    to="/tours/create"
                                >
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getTours}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && tours && tours.length === 0 && (
                            <p>Nenhum resultado encontrado</p>
                        )}

                        {!isLoading && !hasError && tours && tours.length > 0 && tours.map((item, index) => (
                            <ItemCard key={item.id}>
                                <Card className="card-container">
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {item.funcionario.nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                           Valor: R$ {item.valor}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Box className="container-button">
                                            {user.role === 'CLIENTE' && (
                                                <Tooltip title="Salvar funcionário" arrow>
                                                    <IconButton
                                                        aria-label="Salvar funcionário"
                                                        size="small"
                                                        onClick={() => handleConfirmTour(item)}
                                                    >
                                                        <Favorite />
                                                    </IconButton>
                                                </Tooltip>
                                            )}

                                            {user.role === 'ADMIN' && (
                                                <>
                                                    <Tooltip title="Editar" arrow>
                                                        <IconButton
                                                            aria-label="Editar"
                                                            size="small"
                                                            component={Link}
                                                            to={`/tours/edit/${item.id}`}
                                                        >
                                                            <Create />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Excluir" arrow>
                                                        <IconButton
                                                            aria-label="Excluir"
                                                            size="small"
                                                            onClick={() => handleConfirmDelete(item.id, index)}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                </>
                                            )}
                                        </Box>
                                    </CardActions>
                                </Card>
                            </ItemCard>
                        ))}
                    </Box>
                </ContentTour>
            </Box>
        </ContainerTour>
    )
};

export default Tours;
