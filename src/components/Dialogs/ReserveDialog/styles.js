import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';

export const DialogTitleContainer = withTheme(styled.div`
    color: ${props => props.theme.palette.primary.main};
`);

export const DialogContentContainer = withTheme(styled.div`
    p {
        color: ${props => props.theme.palette.description.secondary.light};
    }

    .container-form {
        align-items: center;

        .container-section {
            margin-bottom: 16px;

            h2 {
                margin-bottom: 16px;
            }
        }

        .container-flex {
            display: flex;
            margin-bottom: 16px;
            @media(max-width: 768px) {
                flex-direction: column;
            }
            .item-flex {
                flex: 1;
                &:nth-child(1) {
                    margin-right: 8px;
                    @media(max-width: 768px) {
                        margin-right: 0;
                        margin-bottom: 16px;
                    }
                }
                &:nth-child(2) {
                    margin-left: 8px;
                    @media(max-width: 768px) {
                        margin-left: 0;
                    }
                }
            }
        }

        .input {
            width: 100%;
            & + .input {
                margin-top: 16px;
            }
        }
    }
`);

export const DialogActionContainer = withTheme(styled.div`
    display: flex;
    justify-content: flex-end;

    .wrapper {
        position: relative;

        .circular-progress {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -12px;
            margin-left: -12px;
        }
    }
`);
