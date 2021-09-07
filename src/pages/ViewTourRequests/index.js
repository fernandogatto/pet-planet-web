import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Tooltip,
    IconButton,
    Typography,
} from '@material-ui/core';

import {
    Delete,
} from '@material-ui/icons';

import {
    ContainerViewTourRequests,
    ContentViewTourRequests,
    ItemCard,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import TourRequestOperations from '../../common/rules/TourRequest/TourRequestOperations';

const ViewTourRequests = () => {
    const dispatch = useDispatch();

    const { user } = useAuth();

    const [requests, setRequests] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getTourRequests();
    }, []);

    const getTourRequests = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            let response = [];

            if (user.role === 'CLIENTE') {
                response = await dispatch(TourRequestOperations.getTourRequestByUserId(user.uid));
            } else {
                response = await dispatch(TourRequestOperations.getTourRequests());
            }

            setIsLoading(false);

            setRequests(response);
        } catch (err) {
            console.log('getTourRequests', err);

            setIsLoading(false);

            setHasError(true);
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
        let _items = [...requests];

        _items.splice(item.index, 1);

        setRequests(_items);

        await dispatch(TourRequestOperations.deleteTourRequestById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerViewTourRequests>
            <Menu />

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
                title="Excluir Pedido de Passeio"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentViewTourRequests>
                    <Box className="container-header-page">
                        <h1>Pedidos de Passeio</h1>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getTourRequests}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && requests && requests.length === 0 && (
                            <p>Nenhum resultado encontrado</p>
                        )}

                        {!isLoading && !hasError && requests && requests.map((item, index) => (
                            <ItemCard key={item.id}>
                                <Card className="card-container">
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {item.passeio.funcionario.nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Cliente: {item.usuario.nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Celular: {item.usuario.celular}
                                        </Typography>
                                    </CardContent>

                                    {user.role === 'ADMIN' && (
                                        <CardActions>
                                            <Box className="container-button">
                                                <Tooltip title="Excluir" arrow>
                                                    <IconButton
                                                        aria-label="Excluir"
                                                        size="small"
                                                        onClick={() => handleConfirmDelete(item.id, index)}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </CardActions>
                                    )}
                                </Card>
                            </ItemCard>
                        ))}
                    </Box>
                </ContentViewTourRequests>
            </Box>
        </ContainerViewTourRequests>
    )
};

export default ViewTourRequests;
