import { JSXElement, ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Props = {
  style: 'nav'
}

const Title: ParentComponent<Props> = (props) => {
  const { style } = props

  const theme = useTheme()

  const NavTitle = styled.h1`
    margin: 0.05em 0 0 0.5em;
    height: 100%;
    cursor: default;
    font-weight: 400;
    flex-grow: 1;
    padding: 0;
    font-size: 1em;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    color: ${theme.colors.white};
    -webkit-app-region: drag;
  `

  const renderElement = (children: JSXElement): JSXElement => {
    switch(style) {
      case 'nav':
        return <NavTitle>{children}</NavTitle>
    }
  }

  return (renderElement(props.children))
}

export default Title