import { Component, createEffect, createSignal, onMount } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import Button from '../common/Button/Button'
import Icon from '../common/Icon/Icon'
import Input from '../common/Input/Input'
import Wrapper from '../common/Wrapper/Wrapper'

const MainContent: Component = () => {
    const [games, setGames] = createSignal<{ name?: string, id?: number, assets?: { iconUrl?: string } }>({ assets: {} })
    const [categories, setCategories] = createSignal<{ name?: string, id?: number, iconUrl?: string }>({})

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

    createEffect(() => {
        console.log(categories())
    })

    return (
        <Wrapper style='padding'>
            <Wrapper style='normal'>
                <Button style='dropdown' action={() => {}}>
                    <Icon style='dropdown' link={games().assets.hasOwnProperty('iconUrl') ? games().assets.iconUrl : ''}/>
                    {games().hasOwnProperty('name') ? games().name : ''}
                </Button>
                <Button style='dropdown' action={() => {}}>
                    <Icon style='dropdown' link={categories().hasOwnProperty('iconUrl') ? categories().iconUrl : ''}/>
                    {categories().hasOwnProperty('name') ? categories().name : ''}
                </Button>
                <Input style='search' placeholder='Search by name or author...'>
                </Input>
            </Wrapper>
        </Wrapper>
    )
}

export default MainContent