import { ParentComponent, Setter } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'nav' | 'navClose' | 'filter-dropdown' | 'card-more' | 'card-action'

type Props = {
    style?: Style,
    ref?: HTMLButtonElement,
    action: () => void
}

const Button: ParentComponent<Props> = (props) => {
    const theme = useTheme()

    const Default = styled.button`
        border: 0;
        cursor: pointer;
        background: transparent;
        letter-spacing: 0.1em;
        color: ${theme.colors.white};
        font-size: 1em;
    `

    const Nav = styled(Default)`
        height: 100%;
        text-transform: uppercase;
        font-size: 0.8em;
        padding: 0 0.5em 0 0.5em;
        &:hover {
            background: ${theme.colors.darkest};
        }
    `

    const NavClose = styled(Nav)`
        &:hover {
            background: ${theme.colors.red};
        }
    `

    const Dropdown = styled.button`
        background: ${theme.colors.dark};
        border: 0;
        padding: 0.5em;
        font-size: 1em;
        letter-spacing: 0.1em;
        color: ${theme.colors.white};
        border-radius: ${theme.border.radius};
        cursor: pointer;
        margin-right: 0.2em;
        display: flex;
        &:hover {
            background: ${theme.colors.darkest};
        }
    `

    const CardMore = styled(Dropdown)`
        background: transparent;
        margin: 0;
        padding: 0 0.2em 0 0.2em;
        position: absolute;
        bottom: 0.5em;
        right: 0.5em;
        &:hover {
            background: ${theme.colors.light};
        }
    `

    const CardAction = styled(Default)`
        padding: 0.4em;
        font-size: 1em;
        font-weight: 500;
        text-align: left;
        border-radius: ${theme.border.radius};
        margin-bottom: 0.4em;
        &:hover {
            background: ${theme.colors.light};
        }
    `

    const Element = () => {
        switch (props.style) {
            case 'nav':
                return <Nav type='button' onClick={props.action}>{props.children}</Nav>
            case 'navClose':
                return <NavClose type='button' onClick={props.action}>{props.children}</NavClose>
            case 'filter-dropdown':
                return <Dropdown type='button' onClick={props.action}>{props.children}</Dropdown>
            case 'card-more':
                return <CardMore ref={props.ref} type='button' onClick={props.action}>{props.children}</CardMore>
            case 'card-action':
                return <CardAction type='button' onClick={props.action}>{props.children}</CardAction>
            default:
                return <Default type='button' onClick={props.action}>{props.children}</Default>
        }
    }

    return (Element())
}

export default Button