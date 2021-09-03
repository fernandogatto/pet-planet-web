import React from 'react';
import { Box } from '@material-ui/core';
import SimpleCard from '../../components/Cards';

import {
    ContainerDashboard,
    ContentDashboard,
} from './styles';

import Menu from '../../components/Menu';

const Dashboard = () => {
    return (
        <ContainerDashboard>
            <Menu />

            <Box className="container-page">
                <ContentDashboard>
                    <Box className="container-header-page">
                        <h1>Dashboard</h1>
                    </Box>
                    <Box>
                        <SimpleCard />
                    </Box>
                </ContentDashboard>
            </Box>
        </ContainerDashboard>
    )
};

export default Dashboard;
