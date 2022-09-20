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
        return await fetch(`${this.API_URL}/curseforge/games/${gameID}/main-categories/${classID}/mods/search/${searchFilter}`, { method: 'GET', headers: this.API_HEADERS})
        .then((response) => response.json())
        .then((mods) => {return mods})
    }

    async getFile(modID: number, fileID: number) {
        return await fetch(`${this.API_URL}/curseforge/mods/${modID}/files/${fileID}`, { method: 'GET', headers: this.API_HEADERS})
        .then((response) => response.json())
        .then((file) => {return file})
    }
}

export default CurseForge