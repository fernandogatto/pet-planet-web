import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';

export const ContainerCard = withTheme(styled.div`
    display: grid;
    grid-template-columns: ${props => props.gridTemplateColumns};
    column-gap: 10px;
    row-gap: 15px;

    @media(max-width: 1024px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media(max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }

    @media(max-width: 767px) {
        grid-template-columns: 1fr;
    }

    .card-container {
        padding: 0;
    }

    .image-item {
        height: 200px;
    }
`);
