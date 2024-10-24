// import React, { createContext, useMemo } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { API_URL } from '../server/variables';
import { useTelegram } from '../hooks/useTelegram';
// import WebApp from '@twa-dev/sdk';



// Define the User State Type
interface UserState {
    telegramId: string;
    points: number;
    currentEnergy: number;
    profitPerHour: number;
    pointsPerClick: number;
    originalPointsPerClick: number;
    energyBar: number;
    rechargeSpeed: number
    upgradeLevelClick: number;
    upgradeLevelEnergy: number;
    upgradeLevelProfit: number;
    upgradeLevelRecharge: number
    autoSaveIntervalId: number | null;  // Added autoSaveIntervalId here
    startAutoSave: () => void;  // Function to start the autosave timer
    stopAutoSave: () => void;   // Function to stop the autosave timer
    dailyBoosterUses: {
        tappingBoost: number; // Number of Tapping Boost uses remaining
        fullEnergy: number;   // Number of Full Energy uses remaining
    };  // Tracks how many times boosters are used
    lastBoosterReset: Date;   // The last time the boosters were reset
    lastOnline: Date | null;  // the last time the user was online | to calculate offline PPH

}

// Define the User Actions Type
interface UserActions {
    updatePoints: (newPoints: number) => void;
    upgradeProfitPerHour: (cost: number) => void;
    upgradeStats: (cost: number, stat: string) => Promise<unknown> // upgradeStats returns a promise , don't ask why ^*^
    updateEnergyBar: (amount: number) => void;
    resetUser: () => void;
    setInitialState: (user: UserState) => void
    saveProgress: () => Promise<void>;
    getUpgradeCost: (level: number) => number
    updateEnergy: (newEnergy: number) => void
    resetPointsPerClick: () => void
    applyFullEnergy: () => void;   // Function to apply the Full Energy boost
    checkAndResetBoosters: () => void; // Function to reset boosters every 24 hours
    setLastOnline: (time: Date) => void; //  save last time online | for PPH calculation
}
type UpgradeState = {
    points: number;
} & (
        | { pointsPerClick: number; upgradeLevelClick: number } // If the upgrade is 'Multitap'
        | { energyBar: number; upgradeLevelEnergy: number }     // If the upgrade is 'Energy Limit'
        | { rechargeSpeed: number; upgradeLevelRecharge: number } // If the upgrade is 'Recharge Speed'
    );

// Combined User Store Type
type UserStore = UserState & UserActions;
const { user } = useTelegram()
const id = user?.id

const increasePointsPerClickBy = 1
const increaseEnergyLimitBy = 500
const increaseRechargeSpeedBy = 1
const multiplyTappingBoostBy = 2



// Persisted Zustand Store
const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            telegramId: '',
            points: 5000,           // Initial points
            profitPerHour: 10,     // Points generated automatically per hour
            pointsPerClick: 1,    // Points generated per click
            originalPointsPerClick: 1,  // Keep track of the original value before boost
            energyBar: 1000,       // Initial energy
            currentEnergy: 1000, //persisted energy
            rechargeSpeed: 1,    // Initial recharge speed
            upgradeLevelClick: 1, // Initial level of points per click upgrade
            upgradeLevelEnergy: 1,// Initial level of energy bar upgrade
            upgradeLevelProfit: 1,// Initial level of profit per hour upgrade
            upgradeLevelRecharge: 1,// initial level of recharge speed upgrade
            autoSaveIntervalId: null, // Store the interval ID to stop later if needed
            dailyBoosterUses: { tappingBoost: 3, fullEnergy: 3 },
            lastBoosterReset: new Date(),
            lastOnline: null,
            setInitialState: (user) => { set((state) => ({ telegramId: id?.toString(), profitPerHour: user?.profitPerHour, pointsPerClick: user.pointsPerClick, energyBar: user.energyBar, currentEnergy: state.energyBar, rechargeSpeed: user.rechargeSpeed, upgradeLevelClick: user.upgradeLevelClick, upgradeLevelEnergy: user.upgradeLevelEnergy, upgradeLevelProfit: user.upgradeLevelProfit, upgradeLevelRecharge: user.upgradeLevelRecharge, dailyBoosterUses: { tappingBoost: 3, fullEnergy: 3 }, lastBoosterReset: new Date(), })) },
            // Action to update points
            updatePoints: (newPoints) => {
                set({ points: newPoints })
            },
            updateEnergy: (newEnergy) => {
                set((state) => ({ currentEnergy: newEnergy > state.energyBar ? state.energyBar : newEnergy }))
            },
            getUpgradeCost: (level) => {
                const baseCost = 2500; // Initial cost for level 1
                const multiplier = 2; // Exponential multiplier
                return Math.round(baseCost * Math.pow(multiplier, level - 1)); // Formula for cost
            },
            setLastOnline: (time) => {
                set({ lastOnline: time })
            },




            upgradeStats: (cost, stat) => {
                return new Promise<void>((resolve, reject) => {
                    set((state): UpgradeState => {
                        var updatedState;
                        const { dailyBoosterUses, resetPointsPerClick, energyBar } = get();
                        if (state.points >= cost) {

                            switch (stat) {
                                case 'Multitap':
                                    updatedState = {
                                        points: state.points - cost,
                                        pointsPerClick: state.pointsPerClick + increasePointsPerClickBy,
                                        upgradeLevelClick: state.upgradeLevelClick + 1,
                                    };
                                    resolve(); // Resolving promise if successful
                                    break;


                                case 'Energy Limit':
                                    updatedState = {
                                        points: state.points - cost,
                                        energyBar: state.energyBar + increaseEnergyLimitBy,
                                        upgradeLevelEnergy: state.upgradeLevelEnergy + 1,
                                    };
                                    resolve(); // Resolving promise if successful
                                    break;
                                case 'Recharge Speed':
                                    updatedState = {
                                        points: state.points - cost,
                                        rechargeSpeed: state.rechargeSpeed + increaseRechargeSpeedBy,
                                        upgradeLevelRecharge: state.upgradeLevelRecharge + 1,
                                    };
                                    resolve(); // Resolving promise if successful
                                    break;
                                case 'Tapping Boost':
                                    // Action to apply daily tapping boost
                                    if (dailyBoosterUses.tappingBoost > 0) {
                                        setTimeout(() => {

                                            resetPointsPerClick()

                                        }, 30000);

                                        updatedState = {
                                            pointsPerClick: state.pointsPerClick * multiplyTappingBoostBy, // Apply multiplier
                                            dailyBoosterUses: {
                                                ...state.dailyBoosterUses,
                                                tappingBoost: state.dailyBoosterUses.tappingBoost - 1, // Deduct a booster use
                                            },
                                        }

                                    } else {
                                        updatedState = {
                                            pointsPerClick: state.pointsPerClick, // Apply multiplier
                                            dailyBoosterUses: {
                                                ...state.dailyBoosterUses,
                                                tappingBoost: state.dailyBoosterUses.tappingBoost, // Deduct a booster use
                                            },
                                        }
                                        reject('No more Tapping Boosts left !');
                                    }
                                    resolve()
                                    break;
                                case 'Full Tank':
                                    // Action to apply daily tapping boost
                                    if (dailyBoosterUses.fullEnergy > 0) {
                                        updatedState = {
                                            currentEnergy: energyBar, // Fill up energy bar
                                            dailyBoosterUses: {
                                                ...state.dailyBoosterUses,
                                                fullEnergy: state.dailyBoosterUses.fullEnergy - 1, // Deduct a booster use
                                            },
                                        }

                                    } else {
                                        updatedState = {
                                            // energyBar: energyBar, // Fill up energy bar
                                            dailyBoosterUses: {
                                                ...state.dailyBoosterUses,
                                                fullEnergy: state.dailyBoosterUses.fullEnergy, // Deduct a booster use
                                            },
                                        }
                                        reject('No more Full Energy boosts left !');
                                    }
                                    resolve()
                                    break;
                                default:
                                    reject('Invalid stat upgrade selected!');
                                    break;
                            }
                            return updatedState as UpgradeState; // Return the updated state so it applies correctly
                        } else {
                            reject('Not enough points to upgrade!');
                        }
                        return state; // This ensures the state is preserved when no changes are made.
                    });
                });
            },
            // reset points per click after tapping
            resetPointsPerClick: () => set((state) => {
                return {
                    pointsPerClick: Math.round(state.pointsPerClick * 0.5)
                }
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


            applyFullEnergy: () => {
                const { dailyBoosterUses, energyBar } = get();

                if (dailyBoosterUses.fullEnergy > 0) {
                    set((state) => ({
                        energyBar: energyBar, // Fill up energy bar
                        dailyBoosterUses: {
                            ...state.dailyBoosterUses,
                            fullEnergy: state.dailyBoosterUses.fullEnergy - 1, // Deduct a booster use
                        },
                    }));

                } else {
                    console.log("No more Full Energy boosts left today!");
                }
            },

            checkAndResetBoosters: () => {
                const { lastBoosterReset } = get();
                const now = new Date();

                // Extract only the year, month, and day for both dates
                const lastResetDate = new Date(lastBoosterReset).setHours(0, 0, 0, 0);
                const currentDate = new Date().setHours(0, 0, 0, 0);

                if (currentDate > lastResetDate) {
                    set(() => ({
                        dailyBoosterUses: { tappingBoost: 3, fullEnergy: 3 }, // Reset boosters
                        lastBoosterReset: now,
                    }));
                }
            },

            // Reset user data (useful for game reset)
            resetUser: () => set({
                points: 0,
                profitPerHour: 0,
                pointsPerClick: 1,
                energyBar: 100,
                currentEnergy: 100,
                rechargeSpeed: 1,
                upgradeLevelRecharge: 1,
                upgradeLevelClick: 1,
                upgradeLevelEnergy: 1,
                upgradeLevelProfit: 1,
                dailyBoosterUses: { tappingBoost: 3, fullEnergy: 3 },
                lastBoosterReset: new Date(),
            }),
            // Function to save progress to backend
            saveProgress: async () => {
                const { telegramId, points, pointsPerClick, energyBar, upgradeLevelClick, upgradeLevelEnergy, upgradeLevelRecharge, profitPerHour, rechargeSpeed } = get();

                try {
                    const response = await fetch(`${API_URL}/save-progress`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            telegramId,
                            points,
                            pointsPerClick,
                            energyBar,
                            upgradeLevelClick,
                            upgradeLevelEnergy,
                            upgradeLevelRecharge,
                            profitPerHour,
                            rechargeSpeed
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
            startAutoSave: async () => {
                await get().saveProgress(); // Save after points update

                // console.log('Auto-saving...');
                // WebApp.showAlert("Hello world!");

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
