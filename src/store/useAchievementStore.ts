import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AchievementId = 'explorer' | 'curious_mind' | 'hacker' | 'deep_diver';

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
        description: 'Scrolled to the very bottom.',
        icon: '🗺️',
    },
    curious_mind: {
        id: 'curious_mind',
        title: 'Curious Mind',
        description: 'Flipped a card to learn more.',
        icon: '🧐',
    },
    hacker: {
        id: 'hacker',
        title: 'Hacker',
        description: 'Executed a terminal command.',
        icon: '💻',
    },
    deep_diver: {
        id: 'deep_diver',
        title: 'Deep Diver',
        description: 'Explored a project in detail.',
        icon: '🤿',
    },
};

interface AchievementStore {
    unlockedAchievements: AchievementId[];
    currentToast: Achievement | null;
    unlockAchievement: (id: AchievementId) => void;
    resetAchievements: () => void;
    clearToast: () => void;
}

export const useAchievementStore = create<AchievementStore>()(
    persist(
        (set, get) => ({
            unlockedAchievements: [],
            currentToast: null,
            unlockAchievement: (id: AchievementId) => {
                const { unlockedAchievements } = get();
                if (!unlockedAchievements.includes(id)) {
                    set({
                        unlockedAchievements: [...unlockedAchievements, id],
                        currentToast: achievements[id],
                    });

                    // Play a subtle sound (safely)
                    try {
                        const audio = new Audio('/achievement.mp3');
                        audio.volume = 0.5;
                        audio.play().catch((e) => console.log('Audio play failed (expected if no interaction/file):', e));
                    } catch (e) {
                        console.log('Audio initialization failed:', e);
                    }

                    // Hide toast after 4 seconds
                    setTimeout(() => {
                        set({ currentToast: null });
                    }, 4000);
                }
            },
            resetAchievements: () => {
                set({ unlockedAchievements: [] });
                console.log('Achievements reset');
            },
            clearToast: () => {
                set({ currentToast: null });
            },
        }),
        {
            name: 'achievements', // localStorage key
            partialize: (state) => ({ unlockedAchievements: state.unlockedAchievements }), // only persist unlockedAchievements
        }
    )
);
