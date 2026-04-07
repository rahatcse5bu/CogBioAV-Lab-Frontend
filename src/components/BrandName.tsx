'use client';

import { useState, useEffect } from 'react';

interface BrandNameProps {
    className?: string;
}

export default function BrandName({ className = '' }: BrandNameProps) {
    const [avColor, setAvColor] = useState('text-blue-400');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && data.data?.avColor) {
                        setAvColor(data.data.avColor);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            }
        };
        fetchSettings();
    }, []);

    return (
        <span className={className}>
            Cog-Bio<span className={avColor}>AV</span> Lab
        </span>
    );
}
