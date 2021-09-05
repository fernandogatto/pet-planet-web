import React, { useState } from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Button,
    CircularProgress,
} from '@material-ui/core';

import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import DateLocale from 'date-fns/locale/pt-BR';

import { format } from 'date-fns';

import {
    DialogTitleContainer,
    DialogContentContainer,
    DialogActionContainer,
} from './styles';

const ReserveDialog = ({
    dialogOpen,
    handleCloseDialog,
    title,
    values,
    isSubmiting,
    onSubmit,
}) => {
    const [inputDateData, setInputDateData] = useState({
        data_entrada: new Date(),
        data_saida: new Date(),
    });

    const [inputTextData, setInputTextData] = useState({
        observacao: '',
    });

    const [inputError, setInputError] = useState({
        observacao: false,
    });

    const handleDateChange = (date, name) => {
        setInputDateData({ ...inputDateData, [name]: date });
    }

    const handleInputTextChange = (event) => {
        const { name, value } = event.target;

        setInputTextData({ ...inputTextData, [name]: value });
    }

    const handleSubmit = () => {
        const {
            data_entrada,
            data_saida,
        } = inputDateData;

        const { observacao } = inputTextData;

        setInputError({
            observacao: observacao === '' ? true : false,
        });

        if (observacao !== '') {
            const data = {
                hotel_id: values.hotel_id,
                client_id: values.client_id,
                data_entrada: format(data_entrada, 'dd/MM/yyyy'),
                data_saida: format(data_saida, 'dd/MM/yyyy'),
                observacao,
            };

            onSubmit(data);
        }
    }

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
                    <Box className="container-form">
                        <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={DateLocale}
                        >
                            <DatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                orientation="portrait"
                                name="data_entrada"
                                label="Data de entrada"
                                format="dd/MM/yyyy"
                                value={inputDateData.data_entrada}
                                onChange={(date) => handleDateChange(date, "data_entrada")}
                                disabled={isSubmiting}
                                disablePast
                                minDateMessage="A data não deve ser anterior à data atual"
                                className="input"
                            />

                            <DatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                orientation="portrait"
                                name="data_saida"
                                id="data_saida"
                                label="Data de saída"
                                format="dd/MM/yyyy"
                                value={inputDateData.data_saida}
                                onChange={(date) => handleDateChange(date, "data_saida")}
                                disabled={isSubmiting}
                                disablePast
                                minDate={inputDateData.data_entrada}
                                minDateMessage="A data de saída não deve ser anterior à data  de entrada"
                                className="input"
                            />
                        </MuiPickersUtilsProvider>

                        <TextField
                            required
                            error={inputError.observacao}
                            multiline
                            minRows={5}
                            maxRows={5}
                            variant="outlined"
                            type="text"
                            name="observacao"
                            label="Observação"
                            fullWidth
                            value={inputTextData.observacao}
                            onChange={handleInputTextChange}
                            disabled={isSubmiting}
                            className="input"
                            helperText={inputError.observacao && 'Campo obrigatório'}
                        />
                    </Box>
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
                            onClick={handleSubmit}
                        >
                            Salvar
                        </Button>
                    </Box>
                </DialogActionContainer>
            </DialogActions>
        </Dialog>
    )
};

export default ReserveDialog;
