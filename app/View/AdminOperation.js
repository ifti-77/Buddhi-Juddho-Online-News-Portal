
"use client"
import { useState } from "react";
import AddJournalist from "./AddJournalist";
import JournalistList from "./JournalistList";
import NewsUploadForm from "./NewsUploadForm";
import NewsList from "./NewsList";
import RequestedNews from "./RequestedNews";


export default function AdminOperation({role, username}) {

    const [activeTab, setActiveTab] = useState('addJournalist');

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b-2 border-gray-300 p-3 md:p-4">
                <div className="flex gap-2 flex-wrap">
                    <button 
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${
                            activeTab === 'addJournalist' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab("addJournalist")}
                    >
                        সাংবাদিক নিয়োগ
                    </button>
                    <button 
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${
                            activeTab === 'manageJournalists' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab("manageJournalists")}
                    >
                        সাংবাদিক তালিকা
                    </button>
                    <button 
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${
                            activeTab === 'uploadNews' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab("uploadNews")}
                    >
                        সংবাদ আপলোড
                    </button>
                    <button 
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${
                            activeTab === 'manageNews' 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => setActiveTab("manageNews")}
                    >
                        সংবাদ পরিচালনা
                    </button>
                    <button 
                        className={`px-3 md:px-4 py-2 font-bold uppercase text-xs md:text-sm tracking-wide transition-colors ${
                            activeTab === 'requestedNews' 
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
                {activeTab === 'addJournalist' && <AddJournalist />}
                {activeTab === 'manageJournalists' && <JournalistList />}
                {activeTab === 'uploadNews' && <NewsUploadForm />}
                {activeTab === 'manageNews' && <NewsList role={role} journalistUsername={username} />}
                {activeTab === 'requestedNews' && <RequestedNews />}
            </div>
        </div>
    )
}
