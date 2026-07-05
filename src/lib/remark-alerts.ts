import { visit } from 'unist-util-visit';

export function remarkAlerts() {
  return (tree: any) => {
    visit(tree, 'blockquote', (node) => {
      const firstChild = node.children[0];
      if (!firstChild || firstChild.type !== 'paragraph') return;
      const firstTextNode = firstChild.children[0];
      if (!firstTextNode || firstTextNode.type !== 'text') return;

      const match = firstTextNode.value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
      if (match) {
        const alertType = match[1].toLowerCase();
        
        // Remove the [!TYPE] string from the text node
        firstTextNode.value = firstTextNode.value.substring(match[0].length).replace(/^\s+/, '');
        
        // If the text node is now empty and there are other children, remove it
        if (firstTextNode.value === '' && firstChild.children.length > 1) {
            firstChild.children.shift();
        }

        // Add data attributes for rehype
        node.data = node.data || {};
        node.data.hName = 'div';
        node.data.hProperties = {
          className: `markdown-alert markdown-alert-${alertType}`,
          'data-alert-type': alertType
        };
      }
    });
  };
}
