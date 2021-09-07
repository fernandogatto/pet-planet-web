import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
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
    ContainerAccommodation,
    ContentAccommodation,
    ItemCard,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import HotelOperations from '../../common/rules/Hotel/HotelOperations';

const Accommodation = () => {
    const dispatch = useDispatch();

    const { user } = useAuth();

    const [accommodations, setAccommodations] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getAccommodation();
    }, []);

    const getAccommodation = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(HotelOperations.getHotels());

            setIsLoading(false);

            setAccommodations(response);
        } catch (err) {
            console.log('getAccommodation', err);

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
        let _items = [...accommodations];

        _items.splice(item.index, 1);

        setAccommodations(_items);

        await dispatch(HotelOperations.deleteHotelById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerAccommodation>
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
                title="Excluir Hotel"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentAccommodation>
                    <Box className="container-header-page">
                        <h1>Hospedagem</h1>

                        {user.role === 'ADMIN' && (
                            <Tooltip title="Novo hotel" arrow>
                                <IconButton
                                    aria-label="Novo hotel"
                                    component={Link}
                                    to="/accommodation/create"
                                >
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getAccommodation}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && accommodations && accommodations.length === 0 && (
                            <p>Nenhum resultado encontrado</p>
                        )}

                        {!isLoading && !hasError && accommodations && accommodations.length > 0 && accommodations.map((item, index) => (
                            <ItemCard key={item.id}>
                                <Card className="card-container">
                                    <CardMedia
                                        image={item.imagem}
                                        title={item.nome}
                                        className="image-item"
                                    />

                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {item.nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {item.logradouro}, {item.numero} - {item.bairro}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {item.municipio}, {item.estado}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {item.telefone}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Diária: R$ {item.diaria}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            component={Link}
                                            to={`/accommodation/hotel/${item.id}`}
                                        >
                                            Ver detalhes
                                        </Button>

                                        {user.role === 'ADMIN' && (
                                            <Box className="container-button">
                                                <Tooltip title="Editar" arrow>
                                                    <IconButton
                                                        aria-label="Editar"
                                                        size="small"
                                                        component={Link}
                                                        to={`/accommodation/edit/hotel/${item.id}`}
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
                                        )}
                                    </CardActions>
                                </Card>
                            </ItemCard>
                        ))}
                    </Box>
                </ContentAccommodation>
            </Box>
        </ContainerAccommodation>
    )
};

export default Accommodation;
