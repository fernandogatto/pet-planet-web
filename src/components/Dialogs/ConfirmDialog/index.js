import React from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    CircularProgress,
} from '@material-ui/core';

import {
    DialogTitleContainer,
    DialogContentContainer,
    DialogActionContainer,
} from './styles';

const ConfirmDialog = ({
    dialogOpen,
    handleCloseDialog,
    handleConfirmAction,
    title,
    message,
    isSubmiting,
}) => {
    return (
        <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            keepMounted
            fullWidth
            scroll="paper"
            style={{ margin: 20 }}
        >
            <DialogTitle>
                <DialogTitleContainer>
                    {title}
                </DialogTitleContainer>
            </DialogTitle>

            <DialogContent>
                <DialogContentContainer>
                    <p>{message}</p>
                </DialogContentContainer>
            </DialogContent>

            <DialogActions>
                <DialogActionContainer>
                    <Button
                        color="primary"
                        onClick={handleCloseDialog}
                    >
                        Cancelar
                    </Button>

                    <Box className="wrapper">
                        {isSubmiting && (
                            <CircularProgress
                                className="circular-progress"
                                style={{ width: 24, height: 24 }}
                            />
                        )}

                        <Button
                            aria-label="Submeter formulário"
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmiting}
                            onClick={handleConfirmAction}
                        >
                            Sim
                        </Button>
                    </Box>
                </DialogActionContainer>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;
