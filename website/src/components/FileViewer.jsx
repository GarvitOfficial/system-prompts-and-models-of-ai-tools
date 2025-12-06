import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FileViewer({ file }) {
    const [copied, setCopied] = useState(false);

    if (!file) {
        return (
            <div className="empty-state">
                <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.2 }}>✨</div>
                <h2>Select a prompt to view</h2>
                <p>Browse the collection in the sidebar</p>
            </div>
        );
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(file.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="content-area">
            <button className="copy-btn" onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
            <div className="code-viewer">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={file.path}
                    transition={{ duration: 0.3 }}
                >
                    {file.content}
                </motion.div>
            </div>
        </div>
    );
}
