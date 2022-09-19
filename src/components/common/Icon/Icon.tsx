import { JSXElement, Component } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Props = {
    style: 'dropdown',
    link: string
}

const Icon: Component<Props> = (props) => {
    const theme = useTheme()

    const Dropdown = styled.img`
        width: 20px;
        height: 20px;
        margin-right: 0.2em;
    `

    const renderElement = (): JSXElement => {
        switch (props.style) {
            case 'dropdown':
                return <Dropdown src={props.link}/>
        }
    }

    return (renderElement())
}

export default Icon