import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {
    Box,
    Tooltip,
    IconButton,
    Button,
} from '@material-ui/core';

import { ArrowBack } from '@material-ui/icons';

import {
    ContainerViewHotel,
    ContentViewHotel,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import ReserveDialog from '../../components/Dialogs/ReserveDialog';

import HotelOperations from '../../common/rules/Hotel/HotelOperations';

import ReserveOperations from '../../common/rules/Reserve/ReserveOperations';

const ViewHotel = ({ match }) => {
    const { id } = match.params;

    const history = useHistory();

    const dispatch = useDispatch();

    const { user } = useAuth();

    const [hotel, setHotel] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    useEffect(() => {
        getHotel();
    }, []);

    const getHotel = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(HotelOperations.getHotel(id));

            setIsLoading(false);

            setHotel(response);
        } catch (err) {
            console.log('getHotel', err);

            setIsLoading(false);

            setHasError(true);
        }
    }

    const handleSubmit = async (values) => {
        try {
            setIsSubmiting(true);

            await dispatch(ReserveOperations.postReserve(values));

            setIsSubmiting(false);

            setDialogIsOpen(false);

            history.goBack();
        } catch (err) {
            console.log('handleSubmit', err);

            setIsSubmiting(false);
        }
    }

    return (
        <ContainerViewHotel>
            <Menu />

            <ReserveDialog
                dialogOpen={dialogIsOpen}
                handleCloseDialog={() => setDialogIsOpen(false)}
                title="Fazer reserva"
                values={{
                    hotel_id: Number(id),
                    client_id: user.id,
                }}
                isSubmiting={isSubmiting}
                onSubmit={(data) => handleSubmit(data)}
            />

            <Box className="container-page">
                <ContentViewHotel>
                    <Box className="container-back-page">
                        <Tooltip title="Voltar" arrow>
                            <IconButton
                                aria-label="Voltar página"
                                component={Link}
                                to="/accommodation"
                            >
                                <ArrowBack />
                            </IconButton>
                        </Tooltip>

                        <h1>Hotel</h1>
                    </Box>

                    {!isLoading && !hasError && hotel && hotel.nome !== '' && (
                        <Box className="container-info">
                            <Box className="container-image">
                                <img
                                    src={hotel.imagem}
                                    alt={hotel.nome}
                                />
                            </Box>

                            <Box className="container-description">
                                <Box className="container-title">
                                    <h2>{hotel.nome}</h2>
                                </Box>

                                <Box className="container-registry">
                                    <p>Endereço: {hotel.logradouro}, {hotel.numero} - {hotel.bairro}</p>

                                    <p>{hotel.municipio}, {hotel.estado}</p>

                                    {hotel.telefone && hotel.telefone !== '' && (
                                        <p>{hotel.telefone.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3')}</p>
                                    )}

                                    <p>Diária: R$ {hotel.diaria}</p>
                                </Box>

                                <Box mt={2} className="grid-button">
                                    <Box className="wrapper">
                                        <Button
                                            aria-label="Fazer reserva"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            disabled={isSubmiting}
                                            onClick={() => setDialogIsOpen(true)}
                                        >
                                            Fazer reserva
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </ContentViewHotel>
            </Box>
        </ContainerViewHotel>
    )
};

export default ViewHotel;
