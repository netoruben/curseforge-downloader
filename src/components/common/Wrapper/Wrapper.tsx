import { ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'nav-buttons' | 'inline' | 'main-content' | 'card' | 'list-items' | 'card-actions'

type Props = {
    style?: Style,
    ref?: HTMLDivElement
}

const Wrapper: ParentComponent<Props> = (props) => {
    const theme = useTheme()

    const Default = styled.div`
        width: 100%;
    `

    const NavButtons = styled(Default)`
        width: unset;
        height: 100%;
    `

    const Inline = styled(Default)`
        display: inline-flex;
    `

    const MainContent = styled.div`
        height: calc(100% - 30px - 3em);
        padding: 1.5em;
    `

    const ListItems = styled.div`
        padding-top: 1.5em;
        display: flex;
        flex-flow: wrap;
        white-space: nowrap;
        justify-content: center;
    `

    const Card = styled.div`
        background: ${theme.colors.darkest};
        border-radius: ${theme.border.radius};
        margin: 0 0.5em 0.5em 0;
        padding: 0.5em;
        width: 250px;
        position: relative;
    `

    const CardActions = styled.div`
        display: none;
        position: absolute;
        background: ${theme.colors.dark};
        padding: 0.4em;
        z-index: 1;
        border-radius: ${theme.border.radius};
        left: 0;
        bottom: 0;
    `

    const Element = () => {
        switch (props.style) {
            case 'nav-buttons':
                return <NavButtons>{props.children}</NavButtons>
            case 'inline':
                return <Inline>{props.children}</Inline>
            case 'main-content':
                return <MainContent>{props.children}</MainContent>
            case 'list-items':
                return <ListItems>{props.children}</ListItems>
            case 'card':
                return <Card>{props.children}</Card>
            case 'card-actions':
                return <CardActions ref={props.ref}>{props.children}</CardActions>
            default:
                return <Default>{props.children}</Default>
        }
    }

    return (Element())
}

export default Wrapper