import { createSignal } from 'solid-js'

const toggleBoolean = () => {
    const [status, setStatus] = createSignal(false)
    const toggleStatus = () => setStatus(prev => !prev)

    return { status, toggleStatus }
}

export default toggleBoolean