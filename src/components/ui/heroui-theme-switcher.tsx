'use client';

import { Button } from '@heroui/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function HeroUIThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by showing a neutral state until mounted
  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        className="text-foreground"
        aria-label="Theme switcher loading..."
        isDisabled
      >
        <Moon className="h-4 w-4 opacity-50" />
      </Button>
    );
  }

  const isDark = theme === 'styrcon-dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'styrcon-light' : 'styrcon-dark');
  };

  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      className="text-foreground hover:bg-default/50"
      onClick={toggleTheme}
      aria-label={isDark ? 'Prepnúť na svetlý režim' : 'Prepnúť na tmavý režim'}
      title={isDark ? 'Prepnúť na svetlý režim' : 'Prepnúť na tmavý režim'}
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}