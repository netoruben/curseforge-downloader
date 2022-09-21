import { ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'bold' | 'card' | 'card-blob' | 'card-success' | 'medium'

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
        font-weight: 400;
        white-space: pre-wrap;
        align-items: center;
    `

    const CardSuccess = styled(Card)`
        color: ${theme.colors.green};
    `

    const Medium = styled.span`
        font-weight: 400;
    `

    const Bold = styled.span`
        font-weight: 500;
    `

    const CardBlob = styled(Card)`
        background: ${theme.colors.light};
        padding: 0.2em;
        border-radius: 50px;
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        display: flex;
    `

    const Element = () => {
        switch (props.style) {
            case 'card':
                return <Card>{props.children}</Card>
            case 'card-success':
                return <CardSuccess>{props.children}</CardSuccess>
            case 'medium':
                return <Medium>{props.children}</Medium>
            case 'bold':
                return <Bold>{props.children}</Bold>
            case 'card-blob':
                return <CardBlob>{props.children}</CardBlob>
        }
    }

    return (Element())
}

export default Text