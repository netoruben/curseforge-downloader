import { Component } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Style = 'small' | 'card'

type Props = {
    style: Style,
    src: string
}

const Icon: Component<Props> = (props) => {
    const theme = useTheme()

    const Small = styled.img`
        width: 20px;
        height: 20px;
        margin-right: 0.2em;
    `

    const Card = styled.img`
        border-radius: ${theme.border.radius};
        width: 100px;
        height: 100px;
    `

    const Element = () => {
        switch (props.style) {
            case 'small':
                return <Small src={props.src}/>
            case 'card':
                return <Card src={props.src}/>
        }
    }

    return (Element())
}

export default Icon