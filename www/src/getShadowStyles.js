export default function(shadows) {
  const styles = shadows.filter(s => s.active).map(s => {
    let style = s.inset ? 'inset ' : ''
    style += `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`
    return style
  }).join(',').trim()

  return `box-shadow: ${styles};`
}