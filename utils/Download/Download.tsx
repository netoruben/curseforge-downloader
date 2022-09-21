const fs = require('fs')

class Download {
    constructor() { return this }

    async downloadOnly(downloadUrl: string, fileName: string, savePath: string, setStatus: (value: { value: string, type?: 'success' | 'failed' }) => void) {
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
        setTimeout(() => {
            setStatus(undefined)
        }, 5000)
    }
}

export default Download