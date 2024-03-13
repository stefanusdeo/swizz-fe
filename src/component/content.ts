interface IContentValue {
    headerText: string;
    subHeaderText: string;
    descriptionText: string;
    productSlug: string;
    buttonText: string;
}

interface IMadeValue{
    headerText:string;
    descriptionText: string;
}

interface IContent {
    en: IContentValue;
    es: IContentValue;
    fr: IContentValue;
    gr: IContentValue;
}

interface IMade {
    en: IMadeValue;
    es: IMadeValue;
    fr: IMadeValue;
    gr: IMadeValue;
}

export const madeBy: IMade = {
    en: {
        headerText: "Made In Switzerland",
        descriptionText: "Our personalized shin guards are made in Switzerland and delivered within 3-5 business days. Using our customizer tool, you can create a one-of-a-kind design that will be hand-printed by our team will hand-printed by our team in our workshop."
    },
    es: {
        headerText: "",
        descriptionText: ""
    },
    gr: {
        headerText: "",
        descriptionText: ""
    },
    fr: {
        headerText: "",
        descriptionText: ""
    }
}

export const content1: IContent = {
    en: {
        buttonText: "Create Your Pair",
        descriptionText: "Our mini custom pads redefine lightweight protection. These are the smallest shin guards on the market, perfect for footballers who prefer a barely-there feel. Because sometimes, less is more.",
        headerText: "Mini Custom Pad",
        productSlug: "test-product",
        subHeaderText: "Do you like it small?"
    },
    es: {
        buttonText: "",
        descriptionText: "",
        headerText: "",
        productSlug: "",
        subHeaderText: ""
    },
    fr: {
        buttonText: "",
        descriptionText: "",
        headerText: "",
        productSlug: "",
        subHeaderText: ""
    },
    gr: {
        buttonText: "",
        descriptionText: "",
        headerText: "",
        productSlug: "",
        subHeaderText: ""
    }
}

export const content2: IContent = {
    en: {
        buttonText: "Create Your Pair",
        descriptionText: "Our mini custom pads redefine lightweight protection. These are the smallest shin guards on the market, perfect for footballers who prefer a barely-there feel. Because sometimes, less is more.",
        headerText: "Mini Custom Pad",
        productSlug: "test-product",
        subHeaderText: "Do you like it small?"
    },
    es: {
        buttonText: "",
        descriptionText: "",
        headerText: "",
        productSlug: "",
        subHeaderText: ""
    },
    fr: {
        buttonText: "",
        descriptionText: "",
        headerText: "",
        productSlug: "",
        subHeaderText: ""
    },
    gr: {
        buttonText: "",
        descriptionText: "",
        headerText: "",
        productSlug: "",
        subHeaderText: ""
    }
}