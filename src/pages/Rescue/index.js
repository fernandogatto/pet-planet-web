import React, { useEffect, useState } from 'react';

import { parseISO, format } from 'date-fns';

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
    Delete,
} from '@material-ui/icons';

import {
    ContainerRescue,
    ContentRescue,
    ItemCard,
} from './styles';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import RescueOperations from '../../common/rules/Rescue/RescueOperations';

const Rescue = () => {
    const dispatch = useDispatch();

    const [rescues, setRescues] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getRescues();
    }, []);

    const getRescues = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(RescueOperations.getRescues());

            setIsLoading(false);

            setRescues(response);
        } catch (err) {
            console.log('getRescues', err);

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
        let _items = [...rescues];

        _items.splice(item.index, 1);

        setRescues(_items);

        await dispatch(RescueOperations.deleteRescueById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerRescue>
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
                title="Excluir Resgate"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentRescue>
                    <Box className="container-header-page">
                        <h1>Resgates</h1>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getRescues}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && rescues && rescues.length === 0 && (
                            <p>Nenhum resultado encontrado</p>
                        )}

                        {!isLoading && !hasError && rescues && rescues.length > 0 && rescues.map((item, index) => (
                            <ItemCard key={item.id}>
                                <Card className="card-container">
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {item.especie}
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
                                            Porte: {item.porte}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Celular: {item.celular}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {format(parseISO(item.dataHorario), "dd/MM/yyyy 'às' HH:mm")}
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
                                </Card>
                            </ItemCard>
                        ))}
                    </Box>
                </ContentRescue>
            </Box>
        </ContainerRescue>
    )
};

export default Rescue;
