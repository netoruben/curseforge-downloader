const fs = require('fs')
import JSZip from 'jszip'
import CurseForge from './CurseForge/CurseForge'

type setStatus = (value: { value: string, type?: 'success' | 'failed' }) => void

type FileType = {
    displayName?: string
    fileName: string
    downloadUrl: string
    gameVersion?: string
}

type Manifest = {
    files: {
        projectID: number
        fileID: number
        downloadUrl: string
    }[]
}

class File {
    displayName?: string
    fileName: string
    downloadUrl: string
    gameVersion?: string
    private manifest?: Manifest
    private data?: ArrayBuffer
    private status?: setStatus

    constructor(file: FileType) {
        this.displayName = file.displayName
        this.fileName = file.fileName
        this.downloadUrl = file.downloadUrl
        this.gameVersion = file.gameVersion
        return this
    }

    private async getData() {
        this.data = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.responseType = 'arraybuffer'
            xhr.open('get', this.downloadUrl, true)

            this.status({ value: `Getting ${this.fileName}` })

            xhr.onload = () => {
                if (xhr.status == 200) {
                    resolve(xhr.response)
                } else {
                    reject(`Error ${xhr.status}`)
                }
            };
            xhr.send()
        })
        return this
    }

    private async saveFile(savePath: string) {
        await fs.writeFileSync(savePath + '\\' + this.fileName, Buffer.from(this.data))
        this.status({ value: `Downloaded ${this.fileName}`, type: 'success'})
        return this
    }

    private async extractFoldersAndFiles(savePath: string) {
        const zip = new JSZip()
        await new Promise(async (resolve: (value?: unknown) => void) => {
            await zip.loadAsync(this.data).then(async (zip) => {
                let i = 0
                zip.forEach(async (folderOrFile) => {
                    const file = zip.file(folderOrFile)
                    // Create Folders
                    if (file === null) {
                        setTimeout(() => {
                            this.status({ value: `Extracting ${folderOrFile.replace('overrides/', '')}` })
                            i++
                            if (i === Object.keys(zip.files).length) {
                                resolve()
                            }
                        }, 500)
                        await fs.mkdirSync(savePath + '\\' + this.displayName + folderOrFile.replace('overrides/', '\\').replaceAll('/', '\\'), { recursive: true })
                    // Create Files
                    } else {
                        await zip.file(file.name).async('nodebuffer').then(async (data) => {
                            setTimeout(() => {
                                this.status({ value: `Extracting ${file.name.replace('overrides/', '')}` })
                                i++
                                if (i === Object.keys(zip.files).length) {
                                    resolve()
                                }
                            }, 500)

                            if (file.name === 'manifest.json')
                                this.manifest = await JSON.parse(data.toString())

                            await fs.writeFileSync(savePath + '\\' + this.displayName + '\\' + file.name.replace('overrides/', '').replaceAll('/', '\\'), data)
                        })
                    }
                })
            })
        })
        await fs.mkdirSync(savePath + '\\' + this.displayName + '\\mods', { recursive: true })
        this.status({ value: `Extracted Successfully`, type: 'success' })
        return this
    }

    private async downloadMods(savePath: string) {
        await new Promise((resolve: (value?: unknown) => void) => {
            let i = 0
            this.manifest.files.forEach(async (file) => {
                let downloadUrl = (!file.downloadUrl ? '' : file.downloadUrl)
                let fileName = (!file.downloadUrl ? '' : file.downloadUrl.replace(/^.*\//gm, ''))
                if (!file.downloadUrl) {
                    const mod = await new CurseForge().getFile(file.projectID, file.fileID)
                    fileName = mod.fileName
                    downloadUrl = mod.downloadUrl
                }
                const modFile = new File({ fileName: fileName, downloadUrl: downloadUrl })
                modFile.setStatus(this.status);
                (await modFile.getData()).saveFile(savePath + '\\' + this.displayName + '\\mods')
                i++
                if (i === this.manifest.files.length)
                    resolve()
            })
        })
        this.status({ value: `Download Complete`, type: 'success' })
        return this
    }

    private clearStatus() {
        setTimeout(() => {
            this.status(undefined)
        }, 5000)
    }

    setStatus(setStatus: setStatus) {
        this.status = setStatus
    }

    async downloadFile(savePath: string) {
        (await (await this.getData()).saveFile(savePath)).clearStatus()
    }

    async extract(savePath: string) {
        (await (await (await this.getData()).extractFoldersAndFiles(savePath)).downloadMods(savePath)).clearStatus()
    }
}

export default File