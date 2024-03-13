import { IListCountry } from "@/stores/types/generalTypes";

interface IListColor {
    id: string;
    name: string;
    colorCode: string;
}

interface IListFont {
    id: string;
    name: string;
}

export const listColorLogo: IListColor[] = [
    {
        id: "black",
        colorCode: "#000000",
        name: "Black"
    },
    {
        id: "white",
        colorCode: "#FFFFFF",
        name: "White"
    },
]
export const listColor: IListColor[] = [
    {
        id: "black",
        colorCode: "#000000",
        name: "Black"
    },
    {
        id: "white",
        colorCode: "#FFFFFF",
        name: "White"
    },
    {
        id: "red",
        colorCode: "#ff0000",
        name: "Red"
    },
    {
        id: "blue",
        colorCode: "#0000ff",
        name: "Blue"
    },
    {
        id: "green",
        colorCode: "#49ff00",
        name: "Green"
    },
    {
        id: "yellow",
        colorCode: "#f8ff00",
        name: "Yellow"
    },
]

export const listFont: IListFont[] = [
    {
        id: "bold",
        name: "Bold"
    },
    {
        id: "thin",
        name: "Thin"
    }
]

export const listCountry: IListCountry[] = [
    {
        id: 'austria',
        country: 'Austria',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'Austria (EUR €)'
    },
    {
        id: 'belgium',
        country: 'Belgium',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'Belgium (EUR €)'
    },
    {
        id: 'france',
        country: 'France',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'France (EUR €)'
    },
    {
        id: 'germany',
        country: 'Germany',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'Germany (EUR €)'
    },
    {
        id: 'liechtenstein',
        country: 'Liechtenstein',
        currency: 'CHF',
        currencyLogo: 'CHF',
        textShow: 'Liechtenstein (CHF CHF)'
    },
    {
        id: 'netherlands',
        country: 'Netherlands',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'Netherlands (EUR €)'
    },
    {
        id: 'portugal',
        country: 'Portugal',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'Portugal (EUR €)'
    },
    {
        id: 'spain',
        country: 'Spain',
        currency: 'EUR',
        currencyLogo: '€',
        textShow: 'Spain (EUR €)'
    },
    {
        id: 'switzerland',
        country: 'Switzerland',
        currency: 'CHF',
        currencyLogo: 'CHF',
        textShow: 'Switzerland (CHF CHF)'
    }
]