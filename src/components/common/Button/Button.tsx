import { JSXElement, ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Props = {
  style: 'nav' | 'nav-close' | 'dropdown',
  action: () => void
}

const Button: ParentComponent<Props> = (props) => {
  const theme = useTheme()

  const NavButton = styled.button`
    background: transparent;
    border: 0;
    height: 100%;
    cursor: pointer;
    &:hover {
      background: ${theme.colors.darkest};
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

  const NavCloseButton = styled(NavButton)`
    &:hover {
      background: ${theme.colors.red};
    }
  `

  const renderElement = (): JSXElement => {
    switch (props.style) {
      case 'nav':
        return <NavButton type='button' onClick={props.action}>{props.children}</NavButton>
      case 'nav-close':
        return <NavCloseButton type='button' onClick={props.action}>{props.children}</NavCloseButton>
      case 'dropdown':
        return <Dropdown type='button' onClick={props.action}>{props.children}</Dropdown>
    }
  }

  return (renderElement())
}

export default Button