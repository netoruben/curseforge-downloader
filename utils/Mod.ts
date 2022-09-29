import File from './File'

type ModType = {
    id: number
    gameId: number
    name: string
    authorName: string
    iconUrl: string
    latestFile: File
    serverFile?: File
}

class Mod implements ModType {
    id: number
    gameId: number
    name: string
    authorName: string
    iconUrl: string
    latestFile: File
    serverFile?: File

    constructor(mod: ModType) {
        this.id = mod.id
        this.gameId = mod.gameId
        this.name = mod.name
        this.authorName = mod.authorName
        this.iconUrl = mod.iconUrl
        this.latestFile = mod.latestFile
        this.serverFile = mod.serverFile
        return this
    }
}

export default Mod