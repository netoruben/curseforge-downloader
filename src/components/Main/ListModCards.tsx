import { Component, createEffect, createSignal, createMemo, For } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import Mod from '../../../utils/Mod'
import Wrapper from '../common/Wrapper/Wrapper'
import ModCard from './ModCard'

type Props = {
    gameID: number,
    gameIcon: string,
    classID: number,
    searchFilter: string
}

const ListModCards: Component<Props> = (props) => {
    const [mods, setMods] = createSignal<Mod[]>()

    createMemo(async () => {
        if (props.searchFilter !== undefined) {
            setMods(undefined)
            const mods = await new CurseForge().getMods(props.gameID, props.classID, props.searchFilter)
            setMods(mods)
        }
    }, props.searchFilter)

    createEffect(async () => {
        console.log(mods())
    })

    return (
        <Wrapper style='list-items'>
            <For each={mods()} fallback={<div>Loading...</div>}>
                {mod => <ModCard mod={mod} gameIcon={props.gameIcon} /> }
            </For>
        </Wrapper>
    )
}

export default ListModCards