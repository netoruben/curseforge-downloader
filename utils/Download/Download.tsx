const fs = require('fs')
import JSZip from 'jszip'
import CurseForge from '../CurseForge/CurseForge'
// import fs from 'fs'

class Download {
    constructor() { return this }

    async downloadOnly(downloadUrl: string, fileName: string, savePath: string, useTimeout: boolean, setStatus: (value: { value: string, type?: 'success' | 'failed' }) => void) {
        const data: ArrayBuffer = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.responseType = 'arraybuffer'
            xhr.open('get', downloadUrl, true)

            setStatus({ value: `Downloading ${fileName}` })

            xhr.onload = () => {
                if (xhr.status == 200) {
                    resolve(xhr.response)
                } else {
                    reject(`Error ${xhr.status}`)
                }
            };
            xhr.send()
        })

        await fs.writeFileSync(savePath + '\\' + fileName, Buffer.from(data))
        setStatus({ value: `Downloaded ${fileName}`, type: 'success'})
        if (useTimeout) {
            setTimeout(() => {
                setStatus(undefined)
            }, 5000)
        }
        
    }

    async extractZIP(downloadUrl: string, displayName: string, fileName: string, savePath: string, setStatus: (value: { value: string, type?: 'success' | 'failed' }) => void) {
        const data: ArrayBuffer = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.responseType = 'arraybuffer'
            xhr.open('get', downloadUrl, true)

            setStatus({ value: `Getting ${fileName}` })

            xhr.onload = () => {
                if (xhr.status == 200) {
                    resolve(xhr.response)
                } else {
                    reject(`Error ${xhr.status}`)
                }
            };
            xhr.send()
        })

        const zip = new JSZip()
        const manifest: { files: { projectID: number, fileID: number, downloadUrl: string }[] } = await new Promise(async (resolve: (value?) => void, reject) => {
            let manifest
            await zip.loadAsync(data).then(async (zip) => {
                let i = 0
                zip.forEach(async (folderOrFile) => {
                    const file = zip.file(folderOrFile)
                    // Create Folders
                    if (file === null) {
                        setTimeout(() => {
                            setStatus({ value: `Extracting ${folderOrFile.replace('overrides/', '')}` })
                            i++
                            if (i === Object.keys(zip.files).length) {
                                resolve(manifest)
                            }
                        }, 500)
                        await fs.mkdirSync(savePath + '\\' + displayName + folderOrFile.replace('overrides/', '\\').replaceAll('/', '\\'), { recursive: true })
                    // Create Files
                    } else {
                        await zip.file(file.name).async('nodebuffer').then(async (data) => {
                            setTimeout(() => {
                                setStatus({ value: `Extracting ${file.name.replace('overrides/', '')}` })
                                i++
                                if (i === Object.keys(zip.files).length) {
                                    resolve(manifest)
                                }
                            }, 500)
                            if (file.name === 'manifest.json') {
                                manifest = await JSON.parse(data.toString())
                            }
                            await fs.writeFileSync(savePath + '\\' + displayName + '\\' + file.name.replace('overrides/', '').replaceAll('/', '\\'), data)
                        })
                    }
                })
            })
        })
        await fs.mkdirSync(savePath + '\\' + displayName + '\\mods', { recursive: true })
        setStatus({ value: `Extracted Successfully`, type: 'success' })
        await new Promise((resolve) => {
            let i = 0
            manifest.files.forEach(async (file) => {
                let downloadUrl = (!file.downloadUrl ? '' : file.downloadUrl)
                let fileName = (!file.downloadUrl ? '' : file.downloadUrl.replace(/^.*\//gm, ''))
                if (!file.downloadUrl) {
                    const mod: { fileName: string, downloadUrl: string } = await new CurseForge().getFile(file.projectID, file.fileID)
                    fileName = mod.fileName
                    downloadUrl = mod.downloadUrl
                }
                await this.downloadOnly(downloadUrl, fileName, savePath + '\\' + displayName + '\\mods', false, setStatus)
                i++
                if ( i === manifest.files.length)
                    resolve()
            })
        })
        setStatus({ value: `Download Complete`, type: 'success' })
        setTimeout(() => {
            setStatus(undefined)
        }, 5000)
        
    }
}

export default Download