import { JSXElement, ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Props = {
    style: 'search',
    placeholder: string
}

const Input: ParentComponent<Props> = (props) => {
    const { style, placeholder } = props
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
        box-sizing: border-box;
        height: 100%;
        max-height: 38px;
        &:focus-visible {
            border-width: 0.15em;
            border-style: solid;
            border-color: ${theme.colors.dark};
            outline: unset;
        }
    `

    const renderElement = (children: JSXElement, placeholder: string): JSXElement => {
        switch (style) {
            case 'search':
                return <Primary placeholder={placeholder} >{children}</Primary>
        }
    }

    return (renderElement(props.children, placeholder))
}

export default Input