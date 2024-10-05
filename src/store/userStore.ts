import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the User State Type
interface UserState {
    points: number;
    profitPerHour: number;
    pointsPerClick: number;
    energyBar: number;
    upgradeLevelClick: number;
    upgradeLevelEnergy: number;
    upgradeLevelProfit: number;
}

// Define the User Actions Type
interface UserActions {
    updatePoints: (newPoints: number) => void;
    upgradePointsPerClick: (cost: number) => void;
    upgradeProfitPerHour: (cost: number) => void;
    updateEnergyBar: (amount: number) => void;
    resetUser: () => void;
    setInitialState: (user: UserState) => void
}

// Combined User Store Type
type UserStore = UserState & UserActions;

// Persisted Zustand Store
const useUserStore = create(
    persist<UserStore>(
        (set) => ({
            points: 5000,           // Initial points
            profitPerHour: 10,     // Points generated automatically per hour
            pointsPerClick: 1,    // Points generated per click
            energyBar: 100,       // Initial energy
            upgradeLevelClick: 1, // Initial level of points per click upgrade
            upgradeLevelEnergy: 1,// Initial level of energy bar upgrade
            upgradeLevelProfit: 1,// Initial level of profit per hour upgrade
            setInitialState: (user) => { set(() => ({ points: user?.points, profitPerHour: user.profitPerHour, pointsPerClick: user.pointsPerClick, energyBar: user.energyBar, upgradeLevelClick: user.upgradeLevelClick, upgradeLevelEnergy: user.upgradeLevelEnergy, upgradeLevelProfit: user.upgradeLevelProfit })) },
            // Action to update points
            updatePoints: (newPoints) => set((state) => ({ points: state.points + newPoints })),

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
        }),
        {
            name: 'user-store', // Unique name for storage (localStorage key)
            storage: createJSONStorage(() => sessionStorage), // Define the storage medium (localStorage)
        }
    )
);

export default useUserStore;
