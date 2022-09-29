import { Component, useContext, createSignal, onMount } from 'solid-js'
import Mod from '../../../utils/Mod'
import toogleBoolean from '../hooks/toggleBoolean'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'
import Title from '../common/Title/Title'
import Text from '../common/Text/Text'
import Wrapper from '../common/Wrapper/Wrapper'
import { SettingsContext } from '../../Main'

type Props = {
    mod: Mod
    gameIcon: string
}

const ModCard: Component<Props> = (props) => {
    const settings = useContext<() => { savePath: string }>(SettingsContext)
    const [downloadStatus, setDownloadStatus] = createSignal<{ value: string, type: 'success' | 'failed' }>()
    const { status: cardActionsStatus, toggleStatus: toggleCardActionsStatus } = toogleBoolean()
    let cardActionsElement: HTMLDivElement,
        cardMore: HTMLButtonElement

    const CardActions = {
        toggleCardActionsStatus: () => {if (!cardActionsStatus()) {toggleCardActionsStatus(); cardActionsElement.style.display = 'grid'}}
    }

    onMount(async () => {
        props.mod.latestFile.setStatus(setDownloadStatus)
        props.mod.serverFile.setStatus(setDownloadStatus)

        document.addEventListener('click', (event) => {
            if (cardActionsStatus()) {
                if (event.target !== cardActionsElement && event.target !== cardMore) {
                    toggleCardActionsStatus()
                    cardActionsElement.style.display = 'none'
                }
            }
        })
    })

    const StatusElement = () => {
        if (downloadStatus() !== undefined) {
            const split = downloadStatus().value.split(' ')
            switch (downloadStatus().type) {
                case 'success':
                    return <Text style='card-success'>{split[0]}<Text style='bold'> {split[1]}</Text></Text>
                default:
                    return <Text style='card'>{split[0]}<Text style='bold'> {split[1]}</Text></Text>
            }
        }
    }

    return (
        <Wrapper style='card'>
            <Icon style='card' src={props.mod.iconUrl}/>
            <Title style='card'>{props.mod.name.replaceAll(/(:| -|\((.*)|^ )/gm, '')}<Text style='medium'> by </Text>{props.mod.authorName}</Title>
            <Text style='card-blob'><Icon style='small' src={props.gameIcon}/>{props.mod.latestFile.gameVersion}</Text>
            {StatusElement()}
            <Button style='card-more' action={CardActions.toggleCardActionsStatus} ref={cardMore}>&middot;&middot;&middot;
                <Wrapper style='card-actions' ref={cardActionsElement}>
                    <Button style='card-action' action={() => props.mod.latestFile.extract(settings().savePath)}>Download {props.mod.latestFile.displayName}</Button>
                    <Button style='card-action' action={() => props.mod.latestFile.downloadFile(settings().savePath)}>Download {props.mod.latestFile.fileName}</Button>
                    <Button style='card-action' action={() => props.mod.serverFile.extract(settings().savePath)}>Download {props.mod.serverFile.displayName}</Button>
                    <Button style='card-action' action={() => props.mod.serverFile.downloadFile(settings().savePath)}>Download {props.mod.serverFile.fileName}</Button>
                </Wrapper>
            </Button>
        </Wrapper>
    )
}

export default ModCard