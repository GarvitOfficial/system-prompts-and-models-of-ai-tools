import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import FileViewer from './components/FileViewer';
import { buildFileTree, filterTree } from './utils/fileSystem';

// Import all prompt files eagerly as raw text
const promptFiles = import.meta.glob('/src/prompts/**/*', { query: '?raw', import: 'default', eager: true });

function App() {
  const [selectedPath, setSelectedPath] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fullTree = useMemo(() => buildFileTree(promptFiles), []);

  const filteredTree = useMemo(() => {
    if (!searchQuery) return fullTree;
    const filtered = {};
    Object.keys(fullTree).forEach(key => {
      const result = filterTree(fullTree[key], searchQuery);
      if (result) filtered[key] = result;
    });
    return filtered;
  }, [fullTree, searchQuery]);

  const selectedFile = selectedPath ? {
    path: selectedPath,
    content: promptFiles[selectedPath],
    name: selectedPath.split('/').pop()
  } : null;

  const handleSelect = (item) => {
    setSelectedPath(item.path);
  };

  return (
    <div className="supreme-container">
      <Sidebar
        fileTree={filteredTree}
        onSelect={handleSelect}
        selectedPath={selectedPath}
        onSearch={setSearchQuery}
      />
      <FileViewer file={selectedFile} />
    </div>
  );
}

export default App;
