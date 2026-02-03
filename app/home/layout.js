import Link from "next/link";

export default function homeLayout({ children }) {
    const navCategories = [
        { label: 'সর্বশেষ', href: '#' },
        { label: 'বাংলাদেশ', href: '#' },
        { label: 'রাজনীতি', href: '#' },
        { label: 'বিশ্ব', href: '#' },
        { label: 'বাণিজ্য', href: '#' },
        { label: 'মতামত', href: '#' },
        { label: 'খেলা', href: '#' },
        { label: 'বিনোদন', href: '#' },
        { label: 'চাকরি', href: '#' },
        { label: 'জীবনযাপন', href: '#' },
    ];

    return (
        <div>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <nav className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-4 text-sm font-medium overflow-x-auto">
                    {navCategories.map((cat) => (
                        <Link key={cat.label} href={`/home/${encodeURIComponent(cat.label)}`} className="text-gray-700 hover:text-red-600 whitespace-nowrap">
                            {cat.label}
                        </Link>
                    ))}
                </nav>
            </header>
            <hr />
            {children}
        </div>

    );
}