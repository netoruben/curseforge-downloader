import { Component, createEffect, createSignal, JSXElement, onMount, For } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'
import Input from '../common/Input/Input'
import Title from '../common/Title/Title'
import Text from '../common/Text/Text'
import Wrapper from '../common/Wrapper/Wrapper'

const MainContent: Component = () => {
    const [games, setGames] = createSignal<{ name?: string, id?: number, assets?: { iconUrl?: string } }>({ assets: {} })
    const [categories, setCategories] = createSignal<{ name?: string, id?: number, iconUrl?: string }>({})
    const [mods, setMods] = createSignal<[{ slug: string, name: string, logo: { url: string }, authors: [{ name: string }], latestFiles: { gameVersions: string[] }[] }]>()
    const [searchValue, setSearchValue] = createSignal<string>()

    const getGames = async () => {
        const games: [{name: string}] = await new CurseForge().getGames()
        games.forEach(game => {
            game.name === 'Minecraft' ? setGames(game) : null
        })
    }

    const getCategories = async () => {
        const categories: [{name: string}] = await new CurseForge().getCategories(games().id)
        categories.forEach(categorie => {
            categorie.name === 'Modpacks' ? setCategories(categorie) : null
        })
    }

    const getMods = async (gameID: number, classID: number, searchFilter: string) => {
        const mods = await new CurseForge().getMods(gameID, classID, searchFilter)
        await setMods(mods)
    }

    onMount(async () => {
        await getGames()
        await getCategories()
    })

    createEffect(async () => {
        if(searchValue()) {
            await getMods(games().id, categories().id, searchValue())
            console.log(mods())
        }
    })

    // const renderModCards = (): JSXElement => {
    //     if(mods.length > 0) {
    //         mods().forEach(mod => {
    //             console.log(mod)
    //             return <Wrapper style='mod-card'></Wrapper>
    //         })
    //     }
    // }

    return (
        <Wrapper style='main-content'>
            <Wrapper style='inline'>
                <Button style='filter-dropdown' action={() => {}}>
                    <Icon style='small' src={games().assets.hasOwnProperty('iconUrl') ? games().assets.iconUrl : ''}/>
                    {games().hasOwnProperty('name') ? games().name : ''}
                </Button>
                <Button style='filter-dropdown' action={() => {}}>
                    <Icon style='small' src={categories().hasOwnProperty('iconUrl') ? categories().iconUrl : ''}/>
                    {categories().hasOwnProperty('name') ? categories().name : ''}
                </Button>
                <Input style='filter-search' placeholder='Search by name or author...' setValue={setSearchValue} >
                </Input>
            </Wrapper>
            <Wrapper style='list-items'>
                <For each={mods()} fallback={<div>Loading...</div>}>
                    {(mod) =>
                        <Wrapper style='card'>
                            <Icon style='card' src={mod.logo.url}/>
                            <Title style='card'>{mod.name.replaceAll(/(:| -|\((.*)|^ )/gm, '')}<Text style='bold'> by </Text>{mod.authors[0].name}</Title>
                            <For each={mod.latestFiles[mod.latestFiles.length - 1].gameVersions} fallback={<div>Loading...</div>}>
                                {(version) => {
                                    if(version !== 'Forge')
                                        return <Text style='card-blob'><Icon style='small' src={games().assets.iconUrl}/>{version}</Text>
                                }}
                            </For>
                            <Button style='card' action={() => {}}>&middot;&middot;&middot;</Button>
                        </Wrapper>
                    }
                </For>
            </Wrapper>
        </Wrapper>
    )
}

export default MainContent