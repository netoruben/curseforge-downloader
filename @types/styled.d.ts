import 'solid-styled-components'

declare module "solid-styled-components" {
  export interface DefaultTheme {
    colors: {
        darkest: string,
        dark: string,
        light: string,
        white: string,
        red: string,
        green: string,
        curseforge: string
    }
    border: {
      radius: string
    }
  }
}