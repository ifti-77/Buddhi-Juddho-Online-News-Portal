import Image from "next/image"

export default function Footer() {
    return (
        <div>
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="flex flex-col items-center md:items-start">
                            <Image src="/Buddhi-Juddho-Logo.png" alt="Logo" width={124} height={72} className="mb-4" />
                            <label className="text-sm text-gray-300 mb-2">প্রকাশক ও সম্পাদক: <span className="text-lg text-blue-200 font-semibold">এস.এম. জাহিদ হোসেন</span></label>
                            <label className="text-xs text-gray-300 mb-1">ফরিদপুর অফিস: <span className="text-blue-200">১ নং লেন আয়শা ভিলা, আলিপুর, ফরিদপুর।</span></label>
                            <label className="text-xs text-gray-300">ইমেইল: <span className="text-blue-200">buddhijuddho@yahoo.com</span></label>
                        </div>

                        <div>
                            <h3 className="!text-white font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="!text-gray-300 hover:!text-white transition">Home</a></li>
                                <li><a href="/about" className="!text-gray-300 hover:!text-white transition">About</a></li>
                                <li><a href="/terms&condition" className="!text-gray-300 hover:!text-white transition">Terms & Condition</a></li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left">
                            <p className="text-xs text-gray-300 mb-3">Developed by <span className="font-bold !text-blue-200">Eshraque Jabid Ifti</span></p>
                            <p className="text-xs text-gray-300 mb-2">LinkedIn: <a href="https://www.linkedin.com/in/eshraque-jabid-ifti/" className="!text-blue-200 hover:!text-white transition">eshraque-jabid-ifti</a></p>
                            <p className="text-xs text-gray-300">Email: <a href="mailto:smjabid111@gmail.com" className="!text-blue-200 hover:!text-white transition">smjabid111@gmail.com</a></p>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-6 text-center">
                        <p className="text-xs text-gray-300">&copy; {new Date().getFullYear()} বুদ্ধিযুদ্ধ. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
