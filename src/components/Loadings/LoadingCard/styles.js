import styled from 'styled-components';

import { withTheme } from '@material-ui/core/styles';

export const Container = withTheme(styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 10px;
    row-gap: 15px;

    .card-container {
        padding: 0;
    }

    .image-item {
        height: 200px;
    }
`);
