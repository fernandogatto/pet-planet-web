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
    Create,
    Delete,
} from '@material-ui/icons';

import {
    ContainerTour,
    ContentTour,
    ItemCard,
} from './styles';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import TourOperations from '../../common/rules/Tour/TourOperations';

const Tours = () => {
    const dispatch = useDispatch();

    const [tours, setTours] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getTours();
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

                        <Tooltip title="Novo passeio" arrow>
                            <IconButton
                                aria-label="Novo passeio"
                                component={Link}
                                to="/tours/create"
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getTours}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && tours && tours.length === 0 && (
                            <p>Nenhum item encontrado</p>
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
