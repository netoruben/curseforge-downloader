import { JSXElement, ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Props = {
    style: 'search'
}

const Input: ParentComponent<Props> = (props) => {
    const { style } = props
    const theme = useTheme()

    const Primary = styled.input`
        background: ${theme.colors.darkest};
        border: 0;
        padding: 0.5em;
        font-size: 1em;
        letter-spacing: 0.1em;
        color: ${theme.colors.white};
        border-radius: ${theme.border.radius};
        flex-grow: 1;
    `

    const renderElement = (children: JSXElement): JSXElement => {
        switch (style) {
            case 'search':
                return <Primary>{children}</Primary>
        }
    }

    return (renderElement(props.children))
}

export default Input