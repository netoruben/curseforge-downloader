import { Component, createEffect, createSignal, onMount } from 'solid-js'
import CurseForge from '../../../utils/CurseForge/CurseForge'
import Button from '../common/Button/Button'
import Input from '../common/Input/Input'
import Wrapper from '../common/Wrapper/Wrapper'

const MainContent: Component = () => {
    const [games, setGames] = createSignal<{ name?: string, id?: number }>({})
    const [categories, setCategories] = createSignal<{ name?: string }>({})

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
        <Wrapper style='padding'>
            <Wrapper style='normal'>
                <Button style='dropdown' action={() => {}}>
                    {games().hasOwnProperty('name') ? games().name : ''}
                </Button>
                <Button style='dropdown-no-radius' action={() => {}}>
                    {categories().hasOwnProperty('name') ? categories().name : ''}
                </Button>
                <Input style='search'>
                </Input>
            </Wrapper>
        </Wrapper>
    )
}

export default MainContent