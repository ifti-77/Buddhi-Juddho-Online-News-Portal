"use client"
import { useState } from 'react'

import NewsList from './NewsList';
import NewsUploadForm from './NewsUploadForm';


export default function JournalistOperation({role, username}) {
  const [activeTab, setActiveTab] = useState('uploadNews');

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b-2 border-gray-300 p-4">
                <div className="flex gap-2 flex-wrap">

                    <button 
                        className={`px-4 py-2 font-bold uppercase text-sm tracking-wide transition-colors ${
                            activeTab === 'uploadNews' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab("uploadNews")}
                    >
                        সংবাদ আপলোড
                    </button>
                    <button 
                        className={`px-4 py-2 font-bold uppercase text-sm tracking-wide transition-colors ${
                            activeTab === 'manageNews' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab("manageNews")}
                    >
                        সংবাদ পরিচালনা
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === 'uploadNews' && <NewsUploadForm />}
                {activeTab === 'manageNews' && <NewsList role={role} journalistUsername={username} />}

            </div>
        </div>
    )
}
