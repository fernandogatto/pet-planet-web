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
    ContainerDashboard,
    ContentDashboard,
    ItemCard,
} from './styles';

import { useAuth } from '../../common/contexts/Auth';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import SidebarBox from '../../components/SidebarBox';

import PetOperations from '../../common/rules/Pet/PetOperations';

import AdoptionRequestOperations from '../../common/rules/AdoptionRequest/AdoptionRequestOperations';

import HotelOperations from '../../common/rules/Hotel/HotelOperations';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user } = useAuth();

    const [pets, setPets] = useState([]);

    const [isLoadingPets, setIsLoadingPets] = useState(true);

    const [hasErrorPets, setHasErrorPets] = useState(false);

    const [requests, setRequests] = useState([]);

    const [isLoadingRequests, setIsLoadingRequests] = useState(true);

    const [hasErrorRequests, setHasErrorRequests] = useState(false);

    const [accommodations, setAccommodations] = useState([]);

    const [isLoadingAccommodations, setIsLoadingAccommodations] = useState(true);

    const [hasErrorAccommodations, setHasErrorAccommodations] = useState(false);

    useEffect(() => {
        getPets();

        getAdoptionRequests();

        getAccommodation();
    }, []);

    const getPets = async () => {
        try {
            setIsLoadingPets(true);

            setHasErrorPets(false);

            let response = await dispatch(PetOperations.getPets());

            response = response.slice(0, 3).map(item => item);

            setIsLoadingPets(false);

            setPets(response);
        } catch (err) {
            console.log('getPets', err);

            setIsLoadingPets(false);

            setHasErrorPets(true);
        }
    }

    const getAdoptionRequests = async () => {
        try {
            setIsLoadingRequests(true);

            setHasErrorRequests(false);

            let response = [];

            if (user.role === 'CLIENTE') {
                response = await dispatch(AdoptionRequestOperations.getAdoptionRequestByUserId(user.uid));
            } else {
                response = await dispatch(AdoptionRequestOperations.getAdoptionRequests());
            }

            response = response.slice(0, 3).map(item => item);

            setIsLoadingRequests(false);

            setRequests(response);
        } catch (err) {
            console.log('getAdoptionRequests', err);

            setIsLoadingRequests(false);

            setHasErrorRequests(true);
        }
    }

    const getAccommodation = async () => {
        try {
            setIsLoadingAccommodations(true);

            setHasErrorAccommodations(false);

            let response = await dispatch(HotelOperations.getHotels());

            response = response.slice(0, 3).map(item => item);

            setIsLoadingAccommodations(false);

            setAccommodations(response);
        } catch (err) {
            console.log('getAccommodation', err);

            setIsLoadingAccommodations(false);

            setHasErrorAccommodations(true);
        }
    }

    return (
        <ContainerDashboard>
            <Menu />

            <Box className="container-page">
                <ContentDashboard className="container-grid-area">
                    <Box className="item-header">
                        <h1>Olá, {user.nome}</h1>
                    </Box>

                    <Box className="item-main">
                        <Box className="container-title">
                            <h3>Pedidos de Adoção</h3>

                            <Link to="/adoption-requests">
                                Ver mais
                            </Link>
                        </Box>

                        <LoadingCard
                            isLoading={isLoadingRequests}
                            hasError={hasErrorRequests}
                            onPress={getAdoptionRequests}
                            rows={3}
                            gridTemplateColumns="1fr 1fr 1fr"
                        />

                        <Box className="container-grid">
                            {!isLoadingRequests && !hasErrorRequests && accommodations && accommodations.length === 0 && (
                                <p>Nenhum resultado encontrado</p>
                            )}

                            {!isLoadingRequests && !hasErrorRequests && requests && requests.map((item, index) => (
                                <ItemCard key={item.id}>
                                    <Card className="card-container">
                                        <CardMedia
                                            image={item.pet.imagem}
                                            title={item.pet.nome}
                                            className="image-item"
                                        />

                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                            >
                                                {item.pet.nome}
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
                                    </Card>
                                </ItemCard>
                            ))}
                        </Box>
                    </Box>

                    <Box className="item-sidebar">
                        <SidebarBox
                            title="Adoção"
                            linkDomain="/adoption/pet"
                            linkSeeMore="/adoption"
                            array={pets}
                            isLoading={isLoadingPets}
                            hasError={hasErrorPets}
                            onPress={getPets}
                        />
                    </Box>

                    <Box className="item-footer">
                        <Box className="container-title">
                            <h3>Hospedagem</h3>

                            <Link to="/accommodation">
                                Ver mais
                            </Link>
                        </Box>

                        <LoadingCard
                            isLoading={isLoadingAccommodations}
                            hasError={hasErrorAccommodations}
                            onPress={getAccommodation}
                            rows={3}
                            gridTemplateColumns="1fr 1fr 1fr"
                        />

                        <Box className="container-grid">
                            {!isLoadingAccommodations && !hasErrorAccommodations && accommodations && accommodations.length === 0 && (
                                <p>Nenhum resultado encontrado</p>
                            )}

                            {!isLoadingAccommodations && !hasErrorAccommodations && accommodations && accommodations.length > 0 && accommodations.length > 0 && accommodations.map(item =>
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
                            )}
                        </Box>
                    </Box>
                </ContentDashboard>
            </Box>
        </ContainerDashboard>
    )
};

export default Dashboard;
