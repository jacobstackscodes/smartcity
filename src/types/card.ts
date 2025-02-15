interface CardType {
    className?: string;
    children?: React.ReactNode;
}

interface HeaderType {
    className?: string;
    children?: React.ReactNode;
}

interface TitleType {
    className?: string;
    children?: React.ReactNode;
}

interface ContentType {
    className?: string;
    children?: React.ReactNode;
}

export namespace Props {
    export type Card = CardType;
    export type Header = HeaderType;
    export type Title = TitleType;
    export type Content = ContentType;
}
