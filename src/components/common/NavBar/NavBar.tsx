import { ParentComponent } from 'solid-js'
import { styled, useTheme } from 'solid-styled-components'

export const NavBarCommonActions = {
    minimize: () => nw.Window.get().minimize(),
    maximize: () => nw.Window.get().maximize(),
    restore: () => nw.Window.get().restore(),
    close: () => nw.Window.get().close()
}

export const NavBarCommonSVG = {
    minimize: <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="rotate(45 256 256) translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M2488 2632 l-1128 -1127 0 -43 c0 -35 6 -49 29 -73 24 -23 38 -29 73 -29 l43 0 1127 1128 1128 1127 0 43 c0 35 -6 49 -29 73 -24 23 -38 29 -73 29 l-43 0 -1127 -1128z"/>
                </g>
            </svg>,
    maximize: <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512" height="512" viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(140.000000,140.000000) scale(1,1)">
                    <path d="M220 10C220 4.47716 224.477 0 230 0V0C235.523 0 240 4.47715 240 10V230C240 235.523 235.523 240 230 240V240C224.477 240 220 235.523 220 230V10Z"/>
                    <path d="M0 10C0 4.47716 4.47715 0 10 0V0C15.5228 0 20 4.47715 20 10V230C20 235.523 15.5228 240 10 240V240C4.47715 240 0 235.523 0 230V10Z"/>
                    <path d="M10 20C4.47716 20 0 15.5228 0 10V10C0 4.47715 4.47715 0 10 0L230 0C235.523 0 240 4.47715 240 10V10C240 15.5228 235.523 20 230 20L10 20Z"/>
                    <path d="M10 240C4.47716 240 0 235.523 0 230V230C0 224.477 4.47715 220 10 220H230C235.523 220 240 224.477 240 230V230C240 235.523 235.523 240 230 240H10Z"/>
                </g>
            </svg>,
    restore: <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                <g transform="translate(140.000000,140.000000) scale(1,1)">
                    <path d="M170 60C170 54.4771 174.477 50 180 50V50C185.523 50 190 54.4772 190 60V230C190 235.523 185.523 240 180 240V240C174.477 240 170 235.523 170 230V60Z"/>
                    <path d="M220 10C220 4.47715 224.477 0 230 0V0C235.523 0 240 4.47715 240 10V190C240 195.523 235.523 200 230 200V200C224.477 200 220 195.523 220 190V10Z"/>
                    <path d="M37 10C37 4.47715 41.4772 0 47 0V0C52.5228 0 57 4.47715 57 10V30C57 35.5228 52.5228 40 47 40V40C41.4772 40 37 35.5228 37 30V10Z"/>
                    <path d="M0 59C0 53.4771 4.47715 49 10 49V49C15.5228 49 20 53.4772 20 59V229C20 234.523 15.5228 239 10 239V239C4.47715 239 0 234.523 0 229V59Z"/>
                    <path d="M10 69C4.47715 69 0 64.5228 0 59V59C0 53.4772 4.47715 49 10 49H180C185.523 49 190 53.4772 190 59V59C190 64.5228 185.523 69 180 69H10Z"/>
                    <path d="M50 20C44.4772 20 40 15.5228 40 10V10C40 4.47715 44.4772 0 50 0L230 0C235.523 0 240 4.47715 240 10V10C240 15.5228 235.523 20 230 20L50 20Z"/>
                    <path d="M210 200C204.477 200 200 195.523 200 190V190C200 184.477 204.477 180 210 180H230C235.523 180 240 184.477 240 190V190C240 195.523 235.523 200 230 200H210Z"/>
                    <path d="M10 240C4.47715 240 0 235.523 0 230V230C0 224.477 4.47715 220 10 220H180C185.523 220 190 224.477 190 230V230C190 235.523 185.523 240 180 240H10Z"/>
                </g>
            </svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="30px" height="30px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M1389 3731 c-23 -24 -29 -38 -29 -73 l0 -43 423 -422 c385 -386 425 -423 455 -423 68 0 112 44 112 113 0 29 -42 74 -423 454 l-422 423 -43 0 c-35 0 -49 -6 -73 -29z"/>
                    <path d="M2488 2632 l-1128 -1127 0 -43 c0 -35 6 -49 29 -73 24 -23 38 -29 73 -29 l43 0 1127 1128 1128 1127 0 43 c0 35 -6 49 -29 73 -24 23 -38 29 -73 29 l-43 0 -1127 -1128z"/>
                    <path d="M2784 2351 c-40 -24 -59 -75 -44 -117 9 -27 457 -475 777 -777 94 -89 106 -97 142 -97 57 0 101 45 101 103 l0 42 -422 417 c-233 229 -437 424 -455 433 -41 20 -61 19 -99 -4z"/>
                </g>
            </svg>
}

const NavBar: ParentComponent = (props) => {
  const theme = useTheme()

  const Nav = styled.nav`
    height: 30px;
    width: 100%;
    background: ${theme.colors.dark};
    display: inline-flex;
    justify-content: space-between;
  `

  return (
    <Nav>
        {props.children}
    </Nav>
  )
}

export default NavBar