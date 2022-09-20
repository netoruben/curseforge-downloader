import { Component, createEffect, createSignal, createMemo, For } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import toogleBoolean from '../hooks/toggleBoolean'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'
import Title from '../common/Title/Title'
import Text from '../common/Text/Text'
import Wrapper from '../common/Wrapper/Wrapper'
import ModCard from './ModCard'

type Mods = {
    id: number,
    slug: string,
    name: string,
    logo: { url: string },
    authors: { name: string }[],
    latestFiles: { gameVersions: string[], displayName: string, fileName: string }[]
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
                    <ModCard mod={{ name: mod.name, logoUrl: mod.logo.url, authorName: mod.authors[0].name, gameIcon: props.gameIcon, gameVersions: mod.latestFiles[mod.latestFiles.length - 1].gameVersions, latestFile: { displayName: mod.latestFiles[mod.latestFiles.length - 1].displayName, fileName: mod.latestFiles[mod.latestFiles.length - 1].fileName } }} />
                    // <Wrapper style='card'>
                    //     <Icon style='card' src={mod.logo.url}/>
                    //     <Title style='card'>{mod.name.replaceAll(/(:| -|\((.*)|^ )/gm, '')}<Text style='bold'> by </Text>{mod.authors[0].name}</Title>
                    //     <For each={mod.latestFiles[mod.latestFiles.length - 1].gameVersions} fallback={<div>Loading...</div>}>
                    //         {(version) => {
                    //             if(version !== 'Forge')
                    //                 return <Text style='card-blob'><Icon style='small' src={props.gameIcon}/>{version}</Text>
                    //         }}
                    //     </For>
                    //     <Button style='card' action={CardActions.toggleCardActionsStatus}>&middot;&middot;&middot;
                    //         <Wrapper id={mod.id.toString()} style='card-actions' ref={cardActionsElement}>
                    //             <Button style='card-action' action={() => {}}>Download {mod.latestFiles[mod.latestFiles.length - 1].displayName}</Button>
                    //             <Button style='card-action' action={() => {}}>Download {mod.latestFiles[mod.latestFiles.length - 1].fileName}</Button>
                    //         </Wrapper>
                    //     </Button>
                    // </Wrapper>
                }
            </For>
        </Wrapper>
    )
}

export default ListModCards