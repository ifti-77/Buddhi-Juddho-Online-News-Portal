"use client"

import RequestedNews from "./RequestedNews";
import NewsList from "./NewsList";
import NewsUploadForm from "./NewsUploadForm";
import { useState } from 'react';

export default function EditorOperation({role, username}) {
    const [activeTab, setActiveTab] = useState('uploadNews');

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b-2 border-gray-300 p-3 md:p-4">
                <div className="flex gap-2 flex-wrap">

                    <button
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${activeTab === 'uploadNews'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveTab("uploadNews")}
                    >
                        সংবাদ আপলোড
                    </button>
                    <button
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${activeTab === 'manageNews'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveTab("manageNews")}
                    >
                        সংবাদ পরিচালনা
                    </button>
                    <button
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${activeTab === 'requestedNews'
                                ? 'bg-black text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveTab("requestedNews")}
                    >
                        অনুরোধকৃত সংবাদ
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-4 md:p-6">
                {activeTab === 'uploadNews' && <NewsUploadForm />}
                {activeTab === 'manageNews' && <NewsList role={role} journalistUsername={username} />}
                {activeTab === 'requestedNews' && <RequestedNews />}

            </div>
        </div>
    )
}
