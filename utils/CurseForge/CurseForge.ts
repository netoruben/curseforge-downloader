import File from '../File'
import Mod from '../Mod'

interface CurseForgeMod {
    id: number
    gameId: number
    name: string
    authors: { name: string }[]
    logo: { url: string }
    latestFiles: {
        displayName: string
        fileName: string
        downloadUrl: string
        gameVersions: string[]
        serverPackFileId: number
    }[]
}

interface CurseForgeFile {
    displayName: string
    fileName: string
    downloadUrl: string
}

class CurseForge {
    API_URL = 'http://localhost:3001'
    API_HEADERS = { 'Accept': 'application/json' }

    constructor() { return this }

    async getGames() {
        return await fetch(`${this.API_URL}/curseforge/games`, { method: 'GET', headers: this.API_HEADERS})
        .then((response) => response.json())
        .then((games) => {return games})
    }

    async getCategories(gameID: number) {
        return await fetch(`${this.API_URL}/curseforge/games/${gameID}/categories`, { method: 'GET', headers: this.API_HEADERS})
        .then((response) => response.json())
        .then((categories) => {return categories})
    }

    async getMods(gameID: number, classID: number, searchFilter: string) {
        const Mods: Mod[] = []
        const CurseForgeMods: CurseForgeMod[] = await fetch(`${this.API_URL}/curseforge/games/${gameID}/main-categories/${classID}/mods/search/${searchFilter}`, { method: 'GET', headers: this.API_HEADERS})
        .then((response) => response.json())
        .then((mods) => {return mods})
        return await new Promise((resolve: (value: typeof Mods) => void, reject) => {
            CurseForgeMods.forEach(async (mod: CurseForgeMod) => {
                const modVersion = await new Promise((resolve: (value: string) => void, reject) => {
                    mod.latestFiles[mod.latestFiles.length - 1].gameVersions.forEach(version => {
                        if (version !== 'Forge')
                            resolve(version)
                    })
                })
                let serverFile: CurseForgeFile
                if (mod.latestFiles[mod.latestFiles.length - 1].hasOwnProperty('serverPackFileId'))
                    serverFile = await this.getFile(mod.id, mod.latestFiles[mod.latestFiles.length - 1].serverPackFileId)
                Mods.push(new Mod ({
                    id: mod.id,
                    gameId: mod.gameId,
                    name: mod.name,
                    iconUrl: mod.logo.url,
                    authorName: mod.authors[0].name,
                    latestFile: new File ({
                        displayName: mod.latestFiles[mod.latestFiles.length - 1].displayName,
                        fileName: mod.latestFiles[mod.latestFiles.length - 1].fileName,
                        downloadUrl: mod.latestFiles[mod.latestFiles.length - 1].downloadUrl,
                        gameVersion: modVersion
                    }),
                    serverFile: new File ({
                        displayName: serverFile.displayName,
                        fileName: serverFile.fileName,
                        downloadUrl: serverFile.downloadUrl
                    })
                }))
                if (Mods.length === CurseForgeMods.length)
                    resolve(Mods)
            })
        })
        
    }

    async getFile(modID: number, fileID: number) {
        return await fetch(`${this.API_URL}/curseforge/mods/${modID}/files/${fileID}`, { method: 'GET', headers: this.API_HEADERS})
        .then((response) => response.json())
        .then((file: CurseForgeFile) => {return file})
    }
}

export default CurseForge