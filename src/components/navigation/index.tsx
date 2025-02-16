import { NavItem } from './item';

export const Navigation = () => {
    return (
        <header className="fixed top-0 left-0 z-10 h-16 w-full bg-primary text-white shadow-lg">
            <div className="wrapper flex h-full items-center justify-between">
                <h3 className="text-2xl/none font-semibold">Smart City</h3>
                <nav>
                    <ul className="flex list-none gap-2">
                        <NavItem href="/">Home</NavItem>
                        <NavItem href="/dashboard">Dashboard</NavItem>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
