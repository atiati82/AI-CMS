import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

export type DesignSettings = {
  // Theme colors
  'design.primaryColor'?: string;
  'design.accentColor'?: string;
  'design.backgroundColor'?: string;
  'design.backgroundMode'?: 'light' | 'dark' | 'auto';

  // Typography
  'design.headingScale'?: number;
  'design.bodyFontSize'?: number;
  'design.lineHeight'?: number;

  // Motion
  'design.enableAnimations'?: boolean;
  'design.animationSpeed'?: 'slow' | 'normal' | 'fast';

  // Layout
  'design.maxContainerWidth'?: number;
  'design.sectionSpacing'?: number;
  'design.gridGap'?: number;
};

const defaultSettings: DesignSettings = {
  'design.primaryColor': '#0891b2',
  'design.accentColor': '#10b981',
  'design.backgroundColor': '#0f172a',
  'design.backgroundMode': 'dark',
  'design.headingScale': 1,
  'design.bodyFontSize': 16,
  'design.lineHeight': 1.6,
  'design.enableAnimations': true,
  'design.animationSpeed': 'normal',
  'design.maxContainerWidth': 1280,
  'design.sectionSpacing': 64,
  'design.gridGap': 24,
};

type DesignSettingsContextType = {
  settings: DesignSettings;
  isLoading: boolean;
  isLiteMode: boolean;
};

const DesignSettingsContext = createContext<DesignSettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
  isLiteMode: false,
});

export function useDesignSettings() {
  return useContext(DesignSettingsContext);
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '215 40% 20%';

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applySettingsToDocument(settings: DesignSettings) {
  const root = document.documentElement;

  // Apply theme colors
  if (settings['design.primaryColor']) {
    root.style.setProperty('--primary', hexToHsl(settings['design.primaryColor']));
  }
  if (settings['design.accentColor']) {
    root.style.setProperty('--accent', hexToHsl(settings['design.accentColor']));
  }

  // Apply typography
  if (settings['design.headingScale']) {
    root.style.setProperty('--heading-scale', String(settings['design.headingScale']));
  }
  if (settings['design.bodyFontSize']) {
    root.style.setProperty('--body-font-size', `${settings['design.bodyFontSize']}px`);
  }
  if (settings['design.lineHeight']) {
    root.style.setProperty('--line-height', String(settings['design.lineHeight']));
  }

  // Apply layout
  if (settings['design.maxContainerWidth']) {
    root.style.setProperty('--max-container-width', `${settings['design.maxContainerWidth']}px`);
  }
  if (settings['design.sectionSpacing']) {
    root.style.setProperty('--section-spacing', `${settings['design.sectionSpacing']}px`);
  }
  if (settings['design.gridGap']) {
    root.style.setProperty('--grid-gap', `${settings['design.gridGap']}px`);
  }

  // Apply motion
  if (settings['design.enableAnimations'] === false) {
    root.style.setProperty('--animation-duration', '0s');
  } else {
    const speeds: Record<string, string> = {
      slow: '0.8s',
      normal: '0.5s',
      fast: '0.3s',
    };
    root.style.setProperty('--animation-duration', speeds[settings['design.animationSpeed'] || 'normal']);
  }

  // Apply background mode
  if (settings['design.backgroundMode'] === 'dark') {
    document.body.classList.add('dark');
  } else if (settings['design.backgroundMode'] === 'light') {
    document.body.classList.remove('dark');
  }
}

export function DesignSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<DesignSettings>(defaultSettings);

  const { data, isLoading } = useQuery<Record<string, any>>({
    queryKey: ['/api/design-settings'],
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      const mergedSettings = { ...defaultSettings, ...data };
      setSettings(mergedSettings);
      applySettingsToDocument(mergedSettings);
    }
  }, [data]);

  const isLiteMode = settings['design.enableAnimations'] === false;

  return (
    <DesignSettingsContext.Provider value={{ settings, isLoading, isLiteMode }}>
      {children}
    </DesignSettingsContext.Provider>
  );
}
