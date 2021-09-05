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
} from '@material-ui/core';

import {
    ContainerAccommodation,
    ContentAccommodation,
    ItemCard,
} from './styles';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import HotelOperations from '../../common/rules/Hotel/HotelOperations';

const Accommodation = () => {
    const dispatch = useDispatch();

    const [accommodations, setAccommodations] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

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

            setIsLoading(true);

            setHasError(false);
        }
    }

    return (
        <ContainerAccommodation>
            <Menu />

            <Box className="container-page">
                <ContentAccommodation>
                    <Box className="container-header-page">
                        <h1>Hospedagem</h1>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getAccommodation}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && accommodations && accommodations.length > 0 && accommodations.map(item => (
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
                                            {item.endereco}, {item.numero} - {item.bairro}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {item.cidade}, {item.estado}
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
                                            Diária: {item.diaria}
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
