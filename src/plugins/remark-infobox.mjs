/**
 * Custom remark plugin for :::note, :::tip, :::warning, :::error, :::fun directives
 * Converts container directives to styled div elements.
 * Requires remark-directive to be applied BEFORE this plugin.
 */

const VALID_TYPES = ['note', 'tip', 'warning', 'error', 'fun']

export function remarkInfoBox() {
  return (tree) => {
    // Dynamic import of visit to support ESM
    const processNode = (node) => {
      if (node.type === 'containerDirective' && VALID_TYPES.includes(node.name)) {
        const type = node.name
        const data = node.data || (node.data = {})
        data.hName = 'div'
        data.hProperties = {
          class: `infobox infobox-${type}`,
          'data-type': type,
        }
      }
      if (node.children) {
        node.children.forEach(processNode)
      }
    }
    processNode(tree)
  }
}
