import { Component, createEffect, createSignal, createMemo, For } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import Wrapper from '../common/Wrapper/Wrapper'
import ModCard from './ModCard'

type Mods = {
    id: number,
    slug: string,
    name: string,
    logo: { url: string },
    authors: { name: string }[],
    latestFiles: { gameVersions: string[], displayName: string, fileName: string, modId: number, serverPackFileId: number }[]
}[]

type Props = {
    gameID: number,
    gameIcon: string,
    classID: number,
    searchFilter: string
}

const ListModCards: Component<Props> = (props) => {
    const [mods, setMods] = createSignal<Mods>()

    createMemo(async () => {
        if (props.searchFilter !== undefined) {
            const mods = await new CurseForge().getMods(props.gameID, props.classID, props.searchFilter)
            await setMods(mods)
        }
    }, props.searchFilter)

    createEffect(async () => {
        console.log(mods())
    })

    return (
        <Wrapper style='list-items'>
            <For each={mods()} fallback={<div>Loading...</div>}>
                {(mod) =>
                    <ModCard mod={{ 
                        modID: mod.latestFiles[mod.latestFiles.length - 1].modId,
                        serverPackFileId: mod.latestFiles[mod.latestFiles.length - 1].serverPackFileId,
                        name: mod.name,
                        logoUrl: mod.logo.url,
                        authorName: mod.authors[0].name,
                        gameIcon: props.gameIcon,
                        gameVersions: mod.latestFiles[mod.latestFiles.length - 1].gameVersions,
                        latestFile: { 
                            displayName: mod.latestFiles[mod.latestFiles.length - 1].displayName,
                            fileName: mod.latestFiles[mod.latestFiles.length - 1].fileName 
                        }
                    }} />
                }
            </For>
        </Wrapper>
    )
}

export default ListModCards