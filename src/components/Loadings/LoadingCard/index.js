import React from 'react';

import {
    Box,
    IconButton,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
} from '@material-ui/core';

import { Replay } from '@material-ui/icons';

import { Skeleton } from '@material-ui/lab';

import { Container } from './styles';

const LoadingCard = ({ isLoading, hasError, onPress, rows }) => {
    return (
        <Container>
            {hasError && (
                <Box style={{ textAlign: 'center' }}>
                    <IconButton
                        onClick={onPress}
                    >
                        <Replay />
                    </IconButton>

                    <Typography variant="h6">
                        Tentar novamente
                    </Typography>
                </Box>
            )}

            {isLoading && (
                [...Array(rows)].map((element, index) => (
                    <Card
                        key={index}
                        className="card-container"
                    >
                        <Skeleton
                            animation="wave"
                            variant="rect"
                            className="image-item"
                        />

                        <CardContent>
                            <>
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    style={{ marginBottom: 8 }}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width="80%"
                                />
                            </>
                        </CardContent>

                        <CardActions>
                            <Skeleton
                                animation="wave"
                                variant="rect"
                                height={30}
                                width={100}
                            />
                        </CardActions>
                    </Card>
                ))
            )}
        </Container>
    )
}

export default LoadingCard;
