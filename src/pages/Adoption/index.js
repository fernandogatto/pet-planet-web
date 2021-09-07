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
    ContainerAdoption,
    ContentAdoption,
    ItemCard,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import PetOperations from '../../common/rules/Pet/PetOperations';

const Adoption = () => {
    const dispatch = useDispatch();

    const { user } = useAuth();

    const [pets, setPets] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getPets();
    }, []);

    const getPets = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(PetOperations.getPets());

            setIsLoading(false);

            setPets(response);
        } catch (err) {
            console.log('getPets', err);

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
        let _items = [...pets];

        _items.splice(item.index, 1);

        setPets(_items);

        await dispatch(PetOperations.deletePetById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerAdoption>
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
                title="Excluir Pet"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentAdoption>
                    <Box className="container-header-page">
                        <h1>Adoção</h1>

                        {user.role === 'ADMIN' && (
                            <Tooltip title="Novo pet" arrow>
                                <IconButton
                                    aria-label="Novo pet"
                                    component={Link}
                                    to="/adoption/create"
                                >
                                    <Add />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getPets}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && pets && pets.length === 0 && (
                            <p>Nenhum resultado encontrado</p>
                        )}

                        {!isLoading && !hasError && pets && pets.length > 0 && pets.map((item, index) => (
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
                                            Espécie: {item.especie}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Sexo: {item.sexo}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Idade: {item.idade}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Porte: {item.porte}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button
                                            aria-label="Ver detalhes do pet"
                                            size="small"
                                            color="primary"
                                            component={Link}
                                            to={`/adoption/pet/${item.id}`}
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
                                                        to={`/adoption/edit/pet/${item.id}`}
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
                </ContentAdoption>
            </Box>
        </ContainerAdoption>
    )
};

export default Adoption;
