"use client"

import { changeStatusOfJournalistIntoDB, DeleteJournalistFromDB, getAllJournalist } from "@/lib/journalistInteractions";
import { useEffect, useState } from "react"

export default function JournalistList() {

    const [journalists, setJournalists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchJournalists() {
            setIsLoading(true);
            const response = await getAllJournalist();
            const data = await response
            setJournalists(data);
            setIsLoading(false);
        }
        fetchJournalists();
    }, []);

    const handleStatusChange = async (journalistId, newStatus) => {
        const response = await changeStatusOfJournalistIntoDB(journalistId, newStatus);
        if (response) {
            journalists.forEach(journalist => {
                if (journalist._id === journalistId) {
                    journalist.status = newStatus;
                }
            });

            setJournalists([...journalists]);
            alert(`Journalist ${newStatus === 'active' ? 'activated' : 'blocked'} successfully.`);
        }
    }

    const DeleteJournalist = async (journalistId) => {
        const response = await DeleteJournalistFromDB(journalistId)
        if (response) {
            const updatedJournalistList = journalists.filter(item => item._id !== journalistId);
            setJournalists(updatedJournalistList);
            alert("Journalist deleted successfully.");
        }
    }

    return (
        <div className="w-full mx-auto">
            <div className="bg-white border-2 border-gray-300 shadow-lg">
                {/* Header */}
                <div className="bg-black  px-4 md:px-6 py-3 md:py-4 border-b-4 border-gray-800">
                    <h2 className="!text-white text-xl md:text-2xl font-bold uppercase tracking-wide">সাংবাদিক তালিকা</h2>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
                        </div>
                    ) : journalists.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">কোনো সাংবাদিক খুঁজে পাওয়া যায়নি</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View - Hidden on mobile */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b-2 border-gray-800 bg-gray-100">
                                            <th className="text-left px-4 py-3 font-bold uppercase text-sm tracking-wide">নাম</th>
                                            <th className="text-left px-4 py-3 font-bold uppercase text-sm tracking-wide">ইউজারনেম</th>
                                            <th className="text-left px-4 py-3 font-bold uppercase text-sm tracking-wide">পদবী</th>
                                            <th className="text-center px-4 py-3 font-bold uppercase text-sm tracking-wide">অবস্থা</th>
                                            <th className="text-right px-4 py-3 font-bold uppercase text-sm tracking-wide">অ্যাকশন</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {journalists.map(journalist => (
                                            <tr key={journalist._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-4 font-semibold text-gray-800">{journalist.name}</td>
                                                <td className="px-4 py-4 text-gray-600">{journalist.username}</td>
                                                <td className="px-4 py-4">
                                                    <span className="inline-block px-3 py-1 text-sm font-bold bg-gray-200 text-gray-800 uppercase tracking-wide">
                                                        {journalist.role === 'reporter' ? 'রিপোর্টার' : 'সম্পাদক'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 text-sm font-bold uppercase tracking-wide ${
                                                        journalist.status === 'active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {journalist.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        {journalist.status === "active" ? (
                                                            <button 
                                                                onClick={() => confirm("আপনি কি নিশ্চিত এই সাংবাদিককে ব্লক করতে চান?") && handleStatusChange(journalist._id, 'block')}
                                                                className="px-4 py-2 bg-yellow-500 text-white font-bold uppercase text-xs tracking-wide hover:bg-yellow-600 transition-colors"
                                                            >
                                                                ব্লক করুন
                                                            </button>
                                                        ) : (
                                                            <button 
                                                                onClick={() => confirm("আপনি কি নিশ্চিত এই সাংবাদিককে সক্রিয় করতে চান?") && handleStatusChange(journalist._id, 'active')}
                                                                className="px-4 py-2 bg-green-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-green-700 transition-colors"
                                                            >
                                                                সক্রিয় করুন
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => confirm("আপনি কি নিশ্চিত এই সাংবাদিককে মুছে ফেলতে চান?") && DeleteJournalist(journalist._id)}
                                                            className="px-4 py-2 bg-red-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-red-700 transition-colors"
                                                        >
                                                            মুছুন
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View - Hidden on desktop */}
                            <div className="lg:hidden space-y-4">
                                {journalists.map(journalist => (
                                    <div key={journalist._id} className="border-2 border-gray-200 hover:border-black transition-colors">
                                        <div className="p-4 bg-gray-50 border-b border-gray-200 space-y-2">
                                            <h3 className="font-bold text-lg text-gray-800">{journalist.name}</h3>
                                            <p className="text-sm text-gray-600">ইউজারনেম: {journalist.username}</p>
                                            <div className="flex gap-2 items-center flex-wrap">
                                                <span className="inline-block px-2 py-1 text-xs font-bold bg-gray-200 text-gray-800 uppercase tracking-wide">
                                                    {journalist.role === 'reporter' ? 'রিপোর্টার' : 'সম্পাদক'}
                                                </span>
                                                <span className={`inline-block px-2 py-1 text-xs font-bold uppercase tracking-wide ${
                                                    journalist.status === 'active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {journalist.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3 flex gap-2 flex-wrap justify-stretch bg-white">
                                            {journalist.status === "active" ? (
                                                <button 
                                                    onClick={() => confirm("আপনি কি নিশ্চিত এই সাংবাদিককে ব্লক করতে চান?") && handleStatusChange(journalist._id, 'block')}
                                                    className="flex-1 px-3 py-2 bg-yellow-500 text-white font-bold uppercase text-xs tracking-wide hover:bg-yellow-600 transition-colors"
                                                >
                                                    ব্লক করুন
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => confirm("আপনি কি নিশ্চিত এই সাংবাদিককে সক্রিয় করতে চান?") && handleStatusChange(journalist._id, 'active')}
                                                    className="flex-1 px-3 py-2 bg-green-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-green-700 transition-colors"
                                                >
                                                    সক্রিয় করুন
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => confirm("আপনি কি নিশ্চিত এই সাংবাদিককে মুছে ফেলতে চান?") && DeleteJournalist(journalist._id)}
                                                className="flex-1 px-3 py-2 bg-red-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-red-700 transition-colors"
                                            >
                                                মুছুন
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
