import { Component, createEffect, createSignal, onMount, For } from 'solid-js'
import toogleBoolean from '../hooks/toggleBoolean'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'
import Input from '../common/Input/Input'
import Title from '../common/Title/Title'
import Text from '../common/Text/Text'
import Wrapper from '../common/Wrapper/Wrapper'
import ListModCards from './ListModCards'

const MainContentAction = {
    cardActions: () => {}
}

const MainContent: Component = () => {
    const [games, setGames] = createSignal<{ name?: string, id?: number, assets?: { iconUrl?: string } }>({ assets: {} })
    const [categories, setCategories] = createSignal<{ name?: string, id?: number, iconUrl?: string }>({})
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

    onMount(async () => {
        await getGames()
        await getCategories()
    })

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
            <ListModCards gameID={games().id} gameIcon={games().assets.iconUrl} classID={categories().id} searchFilter={searchValue()}/>
        </Wrapper>
    )
}

export default MainContent