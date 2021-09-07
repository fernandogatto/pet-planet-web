import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

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
    Add,
    Create,
    Delete,
} from '@material-ui/icons';

import {
    ContainerEmployee,
    ContentEmployee,
    ItemCard,
} from './styles';

import Menu from '../../components/Menu';

import LoadingCard from '../../components/Loadings/LoadingCard';

import ConfirmDialog from '../../components/Dialogs/ConfirmDialog';

import EmployeeOperations from '../../common/rules/Employee/EmployeeOperations';

const Employees = () => {
    const dispatch = useDispatch();

    const [employees, setEmployees] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [hasError, setHasError] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [deletedItem, setDeletedItem] = useState({});

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            setIsLoading(true);

            setHasError(false);

            const response = await dispatch(EmployeeOperations.getEmployees());

            setIsLoading(false);

            setEmployees(response);
        } catch (err) {
            console.log('getEmployees', err);

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
        let _items = [...employees];

        _items.splice(item.index, 1);

        setEmployees(_items);

        await dispatch(EmployeeOperations.deleteEmployeeById(item.id));

        setDeletedItem({});
    }

    return (
        <ContainerEmployee>
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
                title="Excluir Funcionário"
                message="Tem certeza que deseja excluir este item?"
            />

            <Box className="container-page">
                <ContentEmployee>
                    <Box className="container-header-page">
                        <h1>Funcionários</h1>

                        <Tooltip title="Novo funcionário" arrow>
                            <IconButton
                                aria-label="Novo funcionário"
                                component={Link}
                                to="/employees/create"
                            >
                                <Add />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <LoadingCard
                        isLoading={isLoading}
                        hasError={hasError}
                        onPress={getEmployees}
                        rows={8}
                    />

                    <Box className="container-grid">
                        {!isLoading && !hasError && employees && employees.length === 0 && (
                            <p>Nenhum item encontrado</p>
                        )}

                        {!isLoading && !hasError && employees && employees.length > 0 && employees.map((item, index) => (
                            <ItemCard key={item.id}>
                                <Card className="card-container">
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
                                           E-mail:  {item.email}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Celular: {item.celular}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Box className="container-button">
                                            <Tooltip title="Editar" arrow>
                                                <IconButton
                                                    aria-label="Editar"
                                                    size="small"
                                                    component={Link}
                                                    to={`/employees/edit/${item.id}`}
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
                                    </CardActions>
                                </Card>
                            </ItemCard>
                        ))}
                    </Box>
                </ContentEmployee>
            </Box>
        </ContainerEmployee>
    )
};

export default Employees;
