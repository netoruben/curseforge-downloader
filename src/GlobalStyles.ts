import { createGlobalStyles } from 'solid-styled-components'
import ChillaxVariableWoff from './fonts/Chillax-Variable.woff'
import ChillaxVariableWoff2 from './fonts/Chillax-Variable.woff2'
import ChillaxVariableTrueType from './fonts/Chillax-Variable.ttf'

const theme = {
    colors: {
      darkest: 'rgb(24, 24, 24)',
      dark: 'rgb(44, 44, 44)',
      light: 'rgb(64, 64, 64)',
      white: 'rgb(255,255,255)',
      red: 'rgb(232, 119, 111)',
      curseforge: '#F16436'
    },
    border: {
        radius: '3px'
    }
}

const Styles = createGlobalStyles`
    @font-face {
        font-family: 'Chillax';
        src: url(${ChillaxVariableWoff2}) format('woff2'),
            url(${ChillaxVariableWoff}) format('woff'),
            url(${ChillaxVariableTrueType}) format('truetype');
        font-weight: 200 700;
        font-display: swap;
        font-style: normal;
    }

    html {
        height: 100%;
        position: relative
    }

    body {
        background: ${theme.colors.light};
        margin: 0;
        padding: 0;
        height: 100%;
        position: relative;
        overflow: hidden;
        font-family: 'Chillax', sans-serif;
    }

    svg {
        width: 30px;
        height: 30px;
        fill: ${theme.colors.white};
    }

    button {
        font-family: inherit;
    }
`
export { theme }
export default Styles