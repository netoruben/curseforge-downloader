import { JSXElement, ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

type Props = {
  style: 'nav' | 'nav-close' | 'dropdown' | 'dropdown-no-radius',
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
    border-bottom-left-radius: ${theme.border.radius};
    border-top-left-radius: ${theme.border.radius};
    cursor: pointer;
    border-right-color: ${theme.colors.darkest};
    border-right-width: 2px;
    border-right-style: solid;
    &:hover {
      background: ${theme.colors.darkest};
    }
  `

  const DropdownNoRadius = styled(Dropdown)`
    border-radius: 0;
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
      case 'dropdown-no-radius':
        return <DropdownNoRadius type='button' onClick={props.action}>{props.children}</DropdownNoRadius>
    }
  }

  return (renderElement())
}

export default Button