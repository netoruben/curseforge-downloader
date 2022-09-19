import { render } from 'solid-js/web'
import { Component } from 'solid-js'
import { ThemeProvider } from 'solid-styled-components'
import Styles, { theme } from './GlobalStyles'
import MainNavBar from './components/Main/MainNavBar'
import MainContent from './components/Main/MainContent'

const Main: Component = () => {

  (() => {
    return <Styles/>
  })()

  return (
    <ThemeProvider theme={theme}>
      <MainNavBar/>
      <MainContent/>
    </ThemeProvider>
  )
}

render(() => <Main />, document.getElementById('root') as HTMLElement);