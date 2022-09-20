import { Component, createEffect, createMemo, createSignal, For, onMount } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import toogleBoolean from '../hooks/toggleBoolean'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'
import Title from '../common/Title/Title'
import Text from '../common/Text/Text'
import Wrapper from '../common/Wrapper/Wrapper'

type ServerFile = {
    displayName: string,
    fileName: string,
    downloadUrl: string
}

type Props = {
    mod: { modID: number, serverPackFileId: number, name: string, logoUrl: string, gameIcon: string, gameVersions: string[], authorName: string, latestFile: { displayName: string, fileName: string }}
}

const ModCard: Component<Props> = (props) => {
    const { status: cardActionsStatus, toggleStatus: toggleCardActionsStatus } = toogleBoolean()
    const [serverFile, setServerFile] = createSignal<ServerFile>()
    let cardActionsElement: HTMLDivElement,
        cardMore: HTMLButtonElement

    const CardActions = {
        toggleCardActionsStatus: () => {if (!cardActionsStatus()) {toggleCardActionsStatus(); cardActionsElement.style.display = 'grid'}}
    }

    
    const getServerFile = async () => {
        const file = await new CurseForge().getFile(props.mod.modID, props.mod.serverPackFileId)
        await setServerFile(file)
    }

    onMount(async () => {
        await getServerFile()

        document.addEventListener('click', (event) => {
            if (cardActionsStatus()) {
                if (event.target !== cardActionsElement && event.target !== cardMore) {
                    toggleCardActionsStatus()
                    cardActionsElement.style.display = 'none'
                }
            }
        })
    })

    createEffect(() => {
        console.log(serverFile())
    })

    return (
        <Wrapper style='card'>
            <Icon style='card' src={props.mod.logoUrl}/>
            <Title style='card'>{props.mod.name.replaceAll(/(:| -|\((.*)|^ )/gm, '')}<Text style='bold'> by </Text>{props.mod.authorName}</Title>
            <For each={props.mod.gameVersions} fallback={<div>Loading...</div>}>
                {(version) => {
                    if(version !== 'Forge')
                        return <Text style='card-blob'><Icon style='small' src={props.mod.gameIcon}/>{version}</Text>
                }}
            </For>
            <Button style='card-more' action={CardActions.toggleCardActionsStatus} ref={cardMore}>&middot;&middot;&middot;
                <Wrapper style='card-actions' ref={cardActionsElement}>
                    <Button style='card-action' action={() => {}}>Download {props.mod.latestFile.displayName}</Button>
                    <Button style='card-action' action={() => {}}>Download {props.mod.latestFile.fileName}</Button>
                    <Button style='card-action' action={() => {}}>Download {serverFile() ? serverFile().displayName : ''}</Button>
                    <Button style='card-action' action={() => {}}>Download {serverFile() ? serverFile().fileName : ''}</Button>
                </Wrapper>
            </Button>
        </Wrapper>
    )
}

export default ModCard