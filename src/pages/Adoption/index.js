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
    ContainerAdoption,
    ContentAdoption,
    ItemCard,
} from './styles';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import PetOperations from '../../common/rules/Pet/PetOperations';

const Adoption = () => {
    const dispatch = useDispatch();

    const [pets, setPets] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

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

            setIsLoading(true);

            setHasError(false);
        }
    }

    return (
        <ContainerAdoption>
            <Menu />

            <Box className="container-page">
                <ContentAdoption>
                    <Box className="container-header-page">
                        <h1>Adoção</h1>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getPets}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && pets && pets.length > 0 && pets.map(item => (
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
                                            size="small"
                                            color="primary"
                                            component={Link}
                                            to={`/adoption/pet/${item.id}`}
                                        >
                                            Ver detalhes
                                        </Button>
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
