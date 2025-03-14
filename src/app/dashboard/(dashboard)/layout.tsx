import { Metadata } from 'next';

type Props = {
    map: React.ReactNode;
    dashboard: React.ReactNode;
};

export default async function Layout({ map, dashboard }: Props) {
    return (
        <main className="relative size-full min-h-dvh pt-[calc(100dvh-9.875rem)]">
            <div className="fixed top-0 left-0 z-0 h-dvh w-dvw bg-gradient-to-r from-gray-500 to-gray-400">
                {map}
            </div>
            <article className="wrapper relative z-5 min-h-[20dvh] rounded-t-xl rounded-b-none bg-white !px-0 shadow-lg shadow-black">
                {dashboard}
            </article>
        </main>
    );
}

export const metadata: Metadata = {
    title: 'Dashboard',
};
