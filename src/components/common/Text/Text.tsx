import { ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'bold' | 'card' | 'card-blob'

type Props = {
    style: Style
}

const Text: ParentComponent<Props> = (props) => {
    const theme = useTheme()

    const Card = styled.p`
        margin: 0;
        padding: 0 0.2em 0.2em 0;
        color: ${theme.colors.white};
        letter-spacing: 0.1em;
        font-weight: 200;
        display: flex;
        align-items: center;
    `

    const Bold = styled.span`
        font-weight: 400;
    `

    const CardBlob = styled(Card)`
        background: ${theme.colors.light};
        padding: 0.2em;
        border-radius: 50px;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
    `

    const Element = () => {
        switch (props.style) {
            case 'card':
                return <Card>{props.children}</Card>
            case 'bold':
                return <Bold>{props.children}</Bold>
            case 'card-blob':
                return <CardBlob>{props.children}</CardBlob>
        }
    }

    return (Element())
}

export default Text