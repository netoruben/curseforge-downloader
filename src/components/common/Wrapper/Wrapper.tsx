import { JSXElement, ParentComponent } from 'solid-js'
import { styled } from 'solid-styled-components'

type Props = {
    style: 'nav-btn' | 'padding' | 'normal'
}

const Wrapper: ParentComponent<Props> = (props) => {
    const { style } = props

    const Normal = styled.div`
        width: 100%;
        display: inline-flex;
    `

    const NavBtn = styled.div`
        height: 100%;
    `

    const Padding = styled.div`
        height: calc(100% - 30px - 3em);
        padding: 1.5em;
    `

    const renderElement = (children: JSXElement): JSXElement => {
        switch (style) {
            case 'nav-btn':
                return <NavBtn>{children}</NavBtn>
            case 'padding':
                return <Padding>{children}</Padding>
            case 'normal':
                return <Normal>{children}</Normal>
        }
    }

    return (renderElement(props.children))
}

export default Wrapper