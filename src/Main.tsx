const fs = require('fs')
const os = require('os')

import { render } from 'solid-js/web'
import { Component, createContext, createSignal } from 'solid-js'
import { ThemeProvider } from 'solid-styled-components'
import Styles, { theme } from './GlobalStyles'
import MainNavBar from './components/Main/MainNavBar'
import MainContent from './components/Main/MainContent'

export const SettingsContext = createContext<() => { savePath: string }>()
const SettingProvider = SettingsContext.Provider

const Main: Component = () => {
  const [settings, setSettings] = createSignal<{ savePath: string }>();

  (async () => {
    fs.readFile(`${nw.App.dataPath}/blob_storage/config.json`, (err, data: Buffer) => {
      if (err) {
        const settings = { savePath: os.homedir() }
        fs.writeFileSync(`${nw.App.dataPath}/blob_storage/config.json`, JSON.stringify(settings))
        setSettings(settings)
        return
      }
      setSettings(JSON.parse(data.toString()))
    })
    return <Styles/>
  })()

  return (
    <ThemeProvider theme={theme}>
      <SettingProvider value={settings}>
        <MainNavBar/>
        <MainContent/>
      </SettingProvider>
    </ThemeProvider>
  )
}

render(() => <Main />, document.getElementById('root') as HTMLElement);