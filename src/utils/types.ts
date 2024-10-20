import { Telegram } from "@twa-dev/types"

declare global {
    interface Window {
        Telegram: Telegram;
    }
}


export type IconProps = {
    size?: number;
    className?: string;
}

export type CardTypes = {
    title: string;
    description: string;
    image: string | any;
    profitPerHour: number | any;
    level: number;
    price: number;
};

export type FriendTypes = {
    name?: string
    telegramId?: string | any;
    username?: string;
    level?: string;
    points: number;
    profitPerHour: number;
    hasTelgramPremium?: boolean;
}