import { Component, createSignal } from 'solid-js'
import Button from '../common/Button/Button'
import NavBar, { NavBarCommonActions, NavBarCommonSVG } from '../common/NavBar/NavBar'
import Title from '../common/Title/Title'
import Wrapper from '../common/Wrapper/Wrapper'

const MainNavBar: Component = () => {
  const [maximized, toggleMaximize] = createSignal(false)

  const renderMaximizeOrUnmaximize = () => {
    switch (maximized()) {
      case true:
        nw.Window.get().once('restore', () => toggleMaximize(prev => !prev))
        {/* Restore Button */ }
        return <Button style='nav' action={NavBarCommonActions.restore}> {NavBarCommonSVG.restore} </Button>
      default:
        nw.Window.get().once('maximize', () => toggleMaximize(prev => !prev))
        {/* Maximize Button */ }
        return <Button style='nav' action={NavBarCommonActions.maximize}> {NavBarCommonSVG.maximize} </Button>
    }
  }

  return (
    <NavBar>
      <Button style='nav' action={() => {}}>Settings</Button>
      <Title style='nav'>
        {nw.Window.get().title}
      </Title>
      <Wrapper style='nav-buttons'>
        {/* Minimize Button */}
        <Button style='nav' action={NavBarCommonActions.minimize}>{NavBarCommonSVG.minimize}</Button>
        {/* Maximize Button or Restore Button*/}
        {renderMaximizeOrUnmaximize()}
        {/* Close Button */}
        <Button style='navClose' action={NavBarCommonActions.close}>{NavBarCommonSVG.close}</Button>
      </Wrapper>
    </NavBar>
  )
}

export default MainNavBar