import styled from 'styled-components';
import{ withTheme } from '@material-ui/core/styles';


export const CardContainer = withTheme(styled.div`
    .cardRoot{
        width: 220px;
    }
    .cardRoot .MuiCardActions-root {
        justify-content: center;
    }
    .bullet{
        display: inline-block;
        margin: 0 2px;
        transform: scale(0.8);
    }
    .title{
        fontSize: 14;
    }
    .pos{
        marginBottom: 12;
    }
    .cardIcons .MuiSvgIcon-root{
        height: 125px;
        width: 125px;
    }
`);