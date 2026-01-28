
"use client"
import { useState } from "react";
import AddJournalist from "./AddJournalist";
import JournalistList from "./JournalistList";
import NewsUploadForm from "./NewsUploadForm";
import NewsList from "./NewsList";
import RequestedNews from "./RequestedNews";


export default function AdminOperation() {

    const [activeTab, setActiveTab] = useState('addJournalist');

    return (
        <div>
            <div className={`mx-2 my-3 bg-blue-300 py-2.5 px-6 border-green-300 rounder-sm
                            flex gap-4 flex-wrap`}>
                <button className="mx-1 my-2 px-6 py-2 border-none rounded-sm
                                bg-green-500 text-white hover:bg-green-700"
                    onClick={() => setActiveTab("addJournalist")}>
                    Assign Journalist
                </button>
                <button className="mx-1 my-2 px-6 py-2 border-none rounded-sm
                                bg-orange-500 text-white hover:bg-orange-700 "
                    onClick={() => setActiveTab("manageJournalists")}>
                    Manage Journalists
                </button>
                <button className="mx-1 my-2 px-6 py-2 border-none rounded-sm
                                bg-purple-500 text-white hover:bg-purple-700 "
                    onClick={() => setActiveTab("uploadNews")}>
                    Upload News
                </button>
                <button className="mx-1 my-2 px-6 py-2 border-none rounded-sm
                                bg-indigo-500 text-white hover:bg-indigo-700 "
                    onClick={() => setActiveTab("manageNews")}>
                    Manage News
                </button>
                <button className="mx-1 my-2 px-6 py-2 border-none rounded-sm
                                bg-gray-500 text-white hover:bg-gray-700 "
                    onClick={() => setActiveTab("requestedNews")}>
                    Requested News
                </button>
            </div>
            {activeTab === 'addJournalist' && (<div>
                <AddJournalist />

            </div>)}
            {activeTab === 'manageJournalists' && (<div>
                <JournalistList />
            </div>)}
            {activeTab === 'uploadNews' && (<div>
                <NewsUploadForm />
            </div>)}
            {activeTab === 'manageNews' && (<div>
                <NewsList />
            </div>)}
            {activeTab === 'requestedNews' && (<div>
                <RequestedNews />
            </div>)}
        </div>
    )
}
