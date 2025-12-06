import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileTreeItem = ({ item, onSelect, selectedPath, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = item.type === 'folder';
    const isSelected = item.path === selectedPath;

    const toggleOpen = (e) => {
        e.stopPropagation();
        if (isFolder) setIsOpen(!isOpen);
        else onSelect(item);
    };

    return (
        <div>
            <div
                className={`tree-item ${isSelected ? 'active' : ''}`}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
                onClick={toggleOpen}
            >
                <span className="tree-item-icon">
                    {isFolder ? (
                        isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                    ) : (
                        <div style={{ width: 14 }} />
                    )}
                </span>
                <span className="tree-item-icon" style={{ color: isFolder ? '#fbbf24' : '#60a5fa' }}>
                    {isFolder ? <Folder size={16} /> : <FileText size={16} />}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                </span>
            </div>

            <AnimatePresence>
                {isFolder && isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="folder-content"
                        style={{ marginLeft: 0, borderLeft: 'none' }}
                    >
                        {Object.values(item.children).map((child) => (
                            <FileTreeItem
                                key={child.path || child.name}
                                item={child}
                                onSelect={onSelect}
                                selectedPath={selectedPath}
                                depth={depth + 1}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Sidebar({ fileTree, onSelect, selectedPath, onSearch }) {
    return (
        <div className="sidebar">
            <div className="search-bar">
                <div style={{ position: 'relative' }}>
                    <Search size={14} style={{ position: 'absolute', left: 10, top: 10, color: '#666' }} />
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        className="search-input"
                        style={{ paddingLeft: 32 }}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="file-tree">
                {Object.values(fileTree).map((item) => (
                    <FileTreeItem
                        key={item.path || item.name}
                        item={item}
                        onSelect={onSelect}
                        selectedPath={selectedPath}
                    />
                ))}
            </div>
        </div>
    );
}
