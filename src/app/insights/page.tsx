import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights',
};

export default function Page() {
    return (
        <div className="wrapper min-h-screen border-x border-border bg-white pt-16">
            <main className="w-full py-8"></main>
        </div>
    );
}
