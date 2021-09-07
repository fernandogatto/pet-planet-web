import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';

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
    ContainerViewReserves,
    ContentViewReserves,
    ItemCard,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import ReserveOperations from '../../common/rules/Reserve/ReserveOperations';

const ViewReserves = () => {
    const dispatch = useDispatch();

    const { user } = useAuth();

    const [reserves, setReserves] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getReserves();
    }, []);

    const getReserves = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            let response = [];

            if (user.role === 'CLIENTE') {
                response = await dispatch(ReserveOperations.getReserveByUserId(user.uid));
            } else {
                response = await dispatch(ReserveOperations.getReserves());
            }

            setIsLoading(false);

            setReserves(response);
        } catch (err) {
            console.log('getReserves', err);

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
        let _items = [...reserves];

        _items.splice(item.index, 1);

        setReserves(_items);

        await dispatch(ReserveOperations.deleteReserveById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerViewReserves>
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
                title="Excluir Reserva"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentViewReserves>
                    <Box className="container-header-page">
                        <h1>Pedidos de Reserva</h1>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getReserves}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && reserves && reserves.length === 0 && (
                            <p>Nenhum item encontrado</p>
                        )}

                        {!isLoading && !hasError && reserves && reserves.map((item, index) => (
                            <ItemCard key={item.id}>
                                <Card className="card-container">
                                    <CardMedia
                                        image={item.hotel.imagem}
                                        title={item.hotel.nome}
                                        className="image-item"
                                    />

                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {item.hotel.nome}
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

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                            style={{
                                                marginTop: 16
                                            }}
                                        >
                                            Entrada: {format(parseISO(item.dataEntrada), 'dd/MM/yyy')}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Saída: {format(parseISO(item.dataEntrada), 'dd/MM/yyy')}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                            style={{
                                                marginTop: 16
                                            }}
                                        >
                                            Observação: {item.observacao}
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
                </ContentViewReserves>
            </Box>
        </ContainerViewReserves>
    )
};

export default ViewReserves;
