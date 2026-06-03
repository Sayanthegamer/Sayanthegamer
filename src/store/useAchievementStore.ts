import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AchievementId = 
  | 'explorer' 
  | 'curious_mind' 
  | 'hacker' 
  | 'deep_diver' 
  | 'synthesizer' 
  | 'cyber_champ' 
  | 'theme_shifter';

export type ActiveTheme = 'aero' | 'cyberpunk' | 'retro' | 'ocean';

export interface Achievement {
    id: AchievementId;
    title: string;
    description: string;
    icon: string;
}

export const achievements: Record<AchievementId, Achievement> = {
    explorer: {
        id: 'explorer',
        title: 'Explorer',
        description: 'Scrolled to the very bottom of the page.',
        icon: '🗺️',
    },
    curious_mind: {
        id: 'curious_mind',
        title: 'Curious Mind',
        description: 'Flipped an interest card to learn more.',
        icon: '🧐',
    },
    hacker: {
        id: 'hacker',
        title: 'Hacker',
        description: 'Executed a CLI terminal command.',
        icon: '💻',
    },
    deep_diver: {
        id: 'deep_diver',
        title: 'Deep Diver',
        description: 'Explored a featured project in detail.',
        icon: '🤿',
    },
    synthesizer: {
        id: 'synthesizer',
        title: 'Synthesizer',
        description: 'Filtered projects using the technology dashboard.',
        icon: '🧪',
    },
    cyber_champ: {
        id: 'cyber_champ',
        title: 'Cyber Champion',
        description: 'Solved the terminal security & trivia quiz.',
        icon: '🧠',
    },
    theme_shifter: {
        id: 'theme_shifter',
        title: 'Theme Shifter',
        description: 'Changed the visual theme of the site.',
        icon: '🎨',
    },
};

interface AchievementStore {
    unlockedAchievements: AchievementId[];
    currentToast: Achievement | null;
    activeTheme: ActiveTheme;
    isMuted: boolean;
    selectedTechFilter: string[];
    unlockAchievement: (id: AchievementId) => void;
    setTheme: (theme: ActiveTheme) => void;
    setMuted: (muted: boolean) => void;
    toggleTechFilter: (tech: string) => void;
    clearTechFilter: () => void;
    resetAchievements: () => void;
    clearToast: () => void;
}

export const useAchievementStore = create<AchievementStore>()(
    persist(
        (set, get) => ({
            unlockedAchievements: [],
            currentToast: null,
            activeTheme: 'aero',
            isMuted: false,
            selectedTechFilter: [],
            unlockAchievement: (id: AchievementId) => {
                const { unlockedAchievements, isMuted } = get();
                if (!unlockedAchievements.includes(id)) {
                    set({
                        unlockedAchievements: [...unlockedAchievements, id],
                        currentToast: achievements[id],
                    });

                    // Play a subtle sound (safely) if not muted
                    if (!isMuted) {
                        try {
                            const audio = new Audio('/achievement.mp3');
                            audio.volume = 0.4;
                            audio.play().catch((e) => console.log('Audio play failed (expected if no interaction):', e));
                        } catch (e) {
                            console.log('Audio initialization failed:', e);
                        }
                    }

                    // Hide toast after 4 seconds
                    setTimeout(() => {
                        set({ currentToast: null });
                    }, 4000);
                }
            },
            setTheme: (theme: ActiveTheme) => {
                const currentTheme = get().activeTheme;
                if (currentTheme !== theme) {
                    set({ activeTheme: theme });
                    get().unlockAchievement('theme_shifter');
                    
                    // Body element class sync for tailwind styling triggers
                    const body = document.body;
                    body.className = `theme-${theme}`;
                }
            },
            setMuted: (muted: boolean) => {
                set({ isMuted: muted });
            },
            toggleTechFilter: (tech: string) => {
                const { selectedTechFilter } = get();
                const newFilter = selectedTechFilter.includes(tech)
                    ? selectedTechFilter.filter((t) => t !== tech)
                    : [...selectedTechFilter, tech];
                set({ selectedTechFilter: newFilter });
                
                if (newFilter.length > 0) {
                    get().unlockAchievement('synthesizer');
                }
            },
            clearTechFilter: () => {
                set({ selectedTechFilter: [] });
            },
            resetAchievements: () => {
                set({ unlockedAchievements: [], activeTheme: 'aero', selectedTechFilter: [] });
                document.body.className = 'theme-aero';
                console.log('Achievements and theme reset');
            },
            clearToast: () => {
                set({ currentToast: null });
            },
        }),
        {
            name: 'sayan-achievements-v2', // localStorage key
            partialize: (state) => ({ 
                unlockedAchievements: state.unlockedAchievements,
                activeTheme: state.activeTheme,
                isMuted: state.isMuted
            }),
        }
    )
);
