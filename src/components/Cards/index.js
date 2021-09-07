import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { IconButton, Tooltip } from '@material-ui/core';
import {
    Home,
    PetsRounded as PetIcon
} from '@material-ui/icons';

import { CardContainer } from './styles';
export default function SimpleCard() {

    return (
        <CardContainer>
            <Card className="cardRoot">
                <CardContent>
                    <Tooltip title="Estadias" arrow>
                        <IconButton
                            className="cardIcons"
                            aria-label="Estadias"
                            component={Link}
                            to="/estadias"
                        >
                            <PetIcon />
                        </IconButton>
                    </Tooltip>
                    <p>Estadias</p>
                </CardContent>
            </Card>
        </CardContainer>
    );
}