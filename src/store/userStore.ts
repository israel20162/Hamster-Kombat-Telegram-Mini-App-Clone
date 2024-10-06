import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { API_URL } from '../server/variables';
import { useTelegram } from '../hooks/useTelegram';
import WebApp from '@twa-dev/sdk';
// Define the User State Type
interface UserState {
    telegramId: string;
    points: number;
    profitPerHour: number;
    pointsPerClick: number;
    energyBar: number;
    upgradeLevelClick: number;
    upgradeLevelEnergy: number;
    upgradeLevelProfit: number;
    autoSaveIntervalId: number | null;  // Added autoSaveIntervalId here
    startAutoSave: () => void;  // Function to start the autosave timer
    stopAutoSave: () => void;   // Function to stop the autosave timer
}

// Define the User Actions Type
interface UserActions {
    updatePoints: (newPoints: number) => void;
    upgradePointsPerClick: (cost: number) => void;
    upgradeProfitPerHour: (cost: number) => void;
    updateEnergyBar: (amount: number) => void;
    resetUser: () => void;
    setInitialState: (user: UserState) => void
    saveProgress: () => Promise<void>;
}

// Combined User Store Type
type UserStore = UserState & UserActions;
const { user } = useTelegram()
const id = user?.id
// Persisted Zustand Store
const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            telegramId: '',
            points: 5000,           // Initial points
            profitPerHour: 10,     // Points generated automatically per hour
            pointsPerClick: 1,    // Points generated per click
            energyBar: 100,       // Initial energy
            upgradeLevelClick: 1, // Initial level of points per click upgrade
            upgradeLevelEnergy: 1,// Initial level of energy bar upgrade
            upgradeLevelProfit: 1,// Initial level of profit per hour upgrade
            autoSaveIntervalId: null, // Store the interval ID to stop later if needed
            setInitialState: (user) => { set(() => ({ telegramId: id?.toString(), profitPerHour: user.profitPerHour, pointsPerClick: user.pointsPerClick, energyBar: user.energyBar, upgradeLevelClick: user.upgradeLevelClick, upgradeLevelEnergy: user.upgradeLevelEnergy, upgradeLevelProfit: user.upgradeLevelProfit })) },
            // Action to update points
            updatePoints: (newPoints) => {
                // const { points } = get();

                set({ points: newPoints })


            },

            // Action to upgrade points per click
            upgradePointsPerClick: (cost) => set((state) => {
                if (state.points >= cost) {
                    return {
                        points: state.points - cost,
                        pointsPerClick: state.pointsPerClick + 1,
                        upgradeLevelClick: state.upgradeLevelClick + 1,
                    };
                }
                return state;
            }),

            // Action to upgrade profit per hour
            upgradeProfitPerHour: (cost) => set((state) => {
                if (state.points >= cost) {
                    return {
                        points: state.points - cost,
                        profitPerHour: state.profitPerHour + (state.profitPerHour * 0.1 || 1),
                        upgradeLevelProfit: state.upgradeLevelProfit + 1,
                    };
                }
                return state;
            }),

            // Action to update energy bar
            updateEnergyBar: (amount) => set((state) => ({
                energyBar: Math.max(0, state.energyBar - amount),
            })),

            // Reset user data (useful for game reset)
            resetUser: () => set({
                points: 0,
                profitPerHour: 0,
                pointsPerClick: 1,
                energyBar: 100,
                upgradeLevelClick: 1,
                upgradeLevelEnergy: 1,
                upgradeLevelProfit: 1,
            }),
            // Function to save progress to backend
            saveProgress: async () => {
                const { telegramId, points, pointsPerClick, energyBar, upgradeLevelClick } = get();



                try {
                    const response = await fetch(`${API_URL}/save-progress`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            telegramId: telegramId,
                            points,
                            pointsPerClick,
                            energyBar,
                            upgradeLevelClick,
                        }),
                    });

                    const result = await response.json();
                    if (!result.success) {
                        console.error('Error saving progress');
                    }
                } catch (error) {
                    console.error('Failed to save progress:', error);
                }
            },
            // Start autosave: triggers periodic saves
            startAutoSave: async() => {           
                await  get().saveProgress(); // Save after points update
              
                console.log('Auto-saving...');
                WebApp.showAlert("Hello world!");
              
                // set({ autoSaveIntervalId: intervalId });

            },

            // Stop autosave
            stopAutoSave: () => {
                const intervalId = get().autoSaveIntervalId;
                if (intervalId) {
                    clearInterval(intervalId);
                    set({ autoSaveIntervalId: null });
                }
            },
        }),
        {
            name: `user-store-${id}`, // Unique name for storage (localStorage key)
            storage: createJSONStorage(() => localStorage), // Define the storage medium (localStorage)
        }
    )
);

export default useUserStore;
