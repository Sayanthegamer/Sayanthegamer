import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AchievementId = 
  | 'explorer' 
  | 'curious_mind' 
  | 'hacker' 
  | 'deep_diver' 
  | 'synthesizer' 
  | 'cyber_champ';

export type GlassMode = 'lens' | 'cube' | 'bar';

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
};

interface AchievementStore {
    unlockedAchievements: AchievementId[];
    currentToast: Achievement | null;
    isMuted: boolean;
    selectedTechFilter: string[];
    isGlassOpen: boolean;
    glassMode: GlassMode;
    isBeamsOpen: boolean;
    activeTheme: string;
    unlockAchievement: (id: AchievementId) => void;
    setMuted: (muted: boolean) => void;
    toggleTechFilter: (tech: string) => void;
    clearTechFilter: () => void;
    setGlassOpen: (open: boolean, mode?: GlassMode) => void;
    setBeamsOpen: (open: boolean) => void;
    setTheme: (theme: string) => void;
    resetAchievements: () => void;
    clearToast: () => void;
}

export const useAchievementStore = create<AchievementStore>()(
    persist(
        (set, get) => ({
            unlockedAchievements: [],
            currentToast: null,
            isMuted: false,
            selectedTechFilter: [],
            isGlassOpen: false,
            glassMode: 'lens',
            isBeamsOpen: false,
            activeTheme: 'aero',
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
                            const audio = new Audio('/achievement.wav');
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
            setGlassOpen: (open: boolean, mode: GlassMode = 'lens') => {
                set({ isGlassOpen: open, glassMode: mode });
            },
            setBeamsOpen: (open: boolean) => {
                set({ isBeamsOpen: open });
            },
            setTheme: (theme: string) => {
                set({ activeTheme: theme });
            },
            resetAchievements: () => {
                set({ unlockedAchievements: [], selectedTechFilter: [], isGlassOpen: false, isBeamsOpen: false });
                console.log('Achievements reset');
            },
            clearToast: () => {
                set({ currentToast: null });
            },
        }),
        {
            name: 'sayan-achievements-v2', // localStorage key
            partialize: (state) => ({ 
                unlockedAchievements: state.unlockedAchievements,
                isMuted: state.isMuted,
                activeTheme: state.activeTheme
            }),
        }
    )
);
