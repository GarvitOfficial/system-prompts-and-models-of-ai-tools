export function buildFileTree(files) {
  const root = {};

  Object.keys(files).forEach((path) => {
    // Remove /src/prompts/ prefix
    const relativePath = path.replace('/src/prompts/', '');

    // Filter out unwanted files/folders
    if (
      relativePath.startsWith('assets/') ||
      relativePath.startsWith('.git/') ||
      relativePath.startsWith('.github/') ||
      relativePath.toLowerCase().endsWith('readme.md') ||
      relativePath.toLowerCase().includes('license') ||
      relativePath.startsWith('website/') ||
      relativePath.startsWith('node_modules/')
    ) {
      return;
    }

    const parts = relativePath.split('/');

    let current = root;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {
          name: part,
          path: path,
          type: index === parts.length - 1 ? 'file' : 'folder',
          children: {},
          content: index === parts.length - 1 ? files[path] : null
        };
      }
      if (index < parts.length - 1) {
        current = current[part].children;
      }
    });
  });

  return root;
}

export function filterTree(node, query) {
  if (!query) return node;

  const lowerQuery = query.toLowerCase();

  // If the node name matches (whether file or folder), return it
  if (node.name && node.name.toLowerCase().includes(lowerQuery)) {
    return node;
  }

  if (node.type === 'file') {
    return null;
  }

  const filteredChildren = {};
  let hasMatch = false;

  Object.values(node.children || {}).forEach(child => {
    const result = filterTree(child, query);
    if (result) {
      filteredChildren[child.name] = result;
      hasMatch = true;
    }
  });

  if (hasMatch) {
    return { ...node, children: filteredChildren };
  }

  return null;
}
