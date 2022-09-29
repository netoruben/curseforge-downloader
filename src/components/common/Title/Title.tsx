import { ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'nav' | 'card'

type Props = {
    style: Style
}

const Title: ParentComponent<Props> = (props) => {
    const theme = useTheme()

    const Default = styled.h1`
        margin: 0;
        padding: 0.2em 0.2em 0.2em 0;
        font-weight: 600;
        font-size: 1em;
        letter-spacing: 0.05em;
        color: ${theme.colors.white};
    `

    const Nav = styled(Default)`
        margin: 0.05em 0 0 0em;
        height: 100%;
        cursor: default;
        font-weight: 500;
        flex-grow: 1;
        padding: 0;
        letter-spacing: 0.1em;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-app-region: drag;
    `

    const Card = styled(Default)`
        white-space: pre-wrap;
        max-width: calc(400px - 150px - 0.4em);
    `

    const Element = () => {
        switch(props.style) {
        case 'nav':
            return <Nav>{props.children}</Nav>
        case 'card':
            return <Card>{props.children}</Card>
        default:
            return <Default>{props.children}</Default>
        }
    }

    return (Element())
}

export default Title