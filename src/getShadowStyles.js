export default function (shadows) {
    const styles = shadows
        .filter((s) => s.active)
        .map((s) => {
            let prefix = s.inset ? 'inset ' : ''
            return `${prefix}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
        })
        .join(',')
        .trim()

    return `box-shadow: ${styles};`
}
