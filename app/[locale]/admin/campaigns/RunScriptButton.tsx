'use client';

import React, { useState } from 'react';
import { runPythonCommand, runPythonBackground } from './actions';
import { Play, Loader2, RefreshCw } from 'lucide-react';

interface RunScriptButtonProps {
    baseCommand: string;
    description: string;
    icon: string;
    highlight?: boolean;
    requireInput?: boolean;
    inputPlaceholder?: string;
    defaultInputValue?: string;
    runInBackground?: boolean;
    onSuccess?: () => void;
}

export function RunScriptButton({
    baseCommand,
    description,
    icon,
    highlight,
    requireInput,
    inputPlaceholder,
    defaultInputValue = '',
    runInBackground,
    onSuccess
}: RunScriptButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState(defaultInputValue);
    const [output, setOutput] = useState<{ text: string, error: boolean } | null>(null);

    const handleRun = async () => {
        setIsLoading(true);
        setOutput(null);

        const args = inputValue.trim();
        const fullCommand = args
            ? `${baseCommand} ${args}`
            : baseCommand;

        try {
            const result = runInBackground
                ? await runPythonBackground(fullCommand)
                : await runPythonCommand(fullCommand);

            setOutput({
                text: result.output || result.error || 'Empty response',
                error: !result.success
            });

            if (result.success && onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            setOutput({
                text: err.message || 'An unknown error occurred',
                error: true
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            background: highlight ? 'rgba(59,130,246,0.1)' : '#1a1d27',
            border: `1px solid ${highlight ? '#3b82f6' : '#2a2d3a'}`,
            borderRadius: 8, padding: '12px 16px', minWidth: 260, flexShrink: 0,
            display: 'flex', flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span style={{ fontWeight: 700, color: highlight ? '#60a5fa' : '#e2e4ec', fontSize: 13 }}>
                    {baseCommand.split(' ')[1] || 'Script'}
                </span>
            </div>

            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 12, lineHeight: 1.4 }}>
                {description}
            </div>

            {requireInput && (
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputPlaceholder}
                    disabled={isLoading}
                    style={{
                        background: '#0f1117', border: '1px solid #2a2d3a', color: '#e2e4ec',
                        padding: '6px 10px', borderRadius: 6, fontSize: 12, marginBottom: 10,
                        width: '100%'
                    }}
                />
            )}

            <button
                onClick={handleRun}
                disabled={isLoading || (requireInput && !inputValue.trim())}
                style={{
                    background: highlight ? '#3b82f6' : '#2a2d3a',
                    color: highlight ? '#ffffff' : '#e2e4ec',
                    border: 'none', borderRadius: 6, padding: '8px 12px',
                    fontSize: 12, fontWeight: 600, cursor: isLoading ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    opacity: isLoading || (requireInput && !inputValue.trim()) ? 0.6 : 1,
                    transition: 'all 0.2s',
                    marginTop: 'auto'
                }}
            >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                {isLoading ? 'Running...' : 'Execute'}
            </button>

            {output && (
                <div style={{
                    marginTop: 12, background: '#0f1117', border: `1px solid ${output.error ? '#ef4444' : '#2a2d3a'}`,
                    borderRadius: 6, padding: 8, maxHeight: 150, overflowY: 'auto',
                    fontSize: 10, fontFamily: 'monospace', color: output.error ? '#fca5a5' : '#9ca3af',
                    whiteSpace: 'pre-wrap', wordBreak: 'break-all'
                }}>
                    {output.text}
                </div>
            )}
        </div>
    );
}
