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
}

export default CurseForge