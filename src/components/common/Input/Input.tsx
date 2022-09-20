import { ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'filter-search'

type Props = {
    style: Style,
    placeholder: string,
    setValue: (value: string) => void
}

const Input: ParentComponent<Props> = (props) => {
    const theme = useTheme()

    const Search = styled.input`
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

    const Element = () => {
        switch (props.style) {
            case 'filter-search':
                return <Search placeholder={props.placeholder} onchange={(event: Event) => {props.setValue((event.target as HTMLInputElement).value)}}>{props.children}</Search>
        }
    }

    return (Element())
}

export default Input