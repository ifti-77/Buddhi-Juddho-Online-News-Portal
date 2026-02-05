"use client"

import { changeRequestNewsIntoDB, DeleteNewsFromDB, fetchNewsFromDB, fetchSpecificNewsFromDB, updateNewsIntoDB } from "@/lib/newsInteractions";
import { useEffect, useEffectEvent, useState } from "react"
import Image from "next/image";
import { replaceThumbnailWithNewId } from "@/actions/uploadNews";
import Link from "next/link";

export default function NewsList({ role, journalistUsername }) {

    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [updateTitleinput, setUpdateTitleInput] = useState("");
    const [updateContentinput, setUpdateContentInput] = useState("");
    const [isfeaturedinput, setIsFeaturedInput] = useState(false);
    const [openNewsUpdateForm, setOpenNewsUpdateForm] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            setIsLoading(true);
            const response = await fetchNewsFromDB();
            const data = await response
            if (role === "admin" || role === "editor") {
                setNews(data);
            } else {
                const filteredNews = data.filter(newsItem => newsItem.authorID === journalistUsername);
                setNews(filteredNews);
            }
            setIsLoading(false);
        }
        fetchNews();
    }, [journalistUsername]);

    useEffect(() => {
        async function fetchSpecificNews() {

            const response = await fetchSpecificNewsFromDB(searchTerm);
            const data = await response
            if (role === "admin" || role === "editor") {
                setNews(data);
            } else {
                const filteredNews = data.filter(newsItem => newsItem.authorID === journalistUsername);
                setNews(filteredNews);
            }
        }
        setTimeout(() => {
            fetchSpecificNews();
        }, 1000);
    }, [searchTerm]);

    const handleSearchInputChange = useEffectEvent((e) => {
        setSearchTerm(e.target.value.trimStart().toLowerCase());
    });

    const handleUpdateFormOpen = (newsId, title, content, featured) => {
        if (openNewsUpdateForm === newsId) {
            setOpenNewsUpdateForm("");
            setUpdateTitleInput("");
            setUpdateContentInput("");
            setIsFeaturedInput(false);
        } else {
            setOpenNewsUpdateForm(newsId);
            setUpdateTitleInput(title);
            setUpdateContentInput(content);
            setIsFeaturedInput(featured);
        }

    }

    const handleUpdateFormSubmit = async (_id, current_thumbnail, e) => {
        e.preventDefault();
        setIsPending(true);
        console.log("checking:", isfeaturedinput);

        const thumbnailPath = e.target.thumbnail.files[0] ? await replaceThumbnailWithNewId(e.target.thumbnail.files[0], current_thumbnail) : current_thumbnail;
        const response = await updateNewsIntoDB({ _id: _id, title: updateTitleinput, content: updateContentinput, category: e.target.category.value, featured: isfeaturedinput, thumbnailPath: thumbnailPath })
        const data = await response;
        if (data.success) {
            news.forEach((item, index) => {
                if (item._id === _id) {
                    news[index].title = updateTitleinput;
                    news[index].content = updateContentinput;
                    news[index].category = e.target.category.value;
                    news[index].featured = isfeaturedinput;
                    news[index].thumbnailPath = thumbnailPath;
                }
            });
        }
        setIsPending(false);
    }

    const filterOutNews = async (newsID, current_thumbnail) => {
        if (await DeleteNewsFromDB(newsID, current_thumbnail)) {
            const updatedNewsList = news.filter(item => item._id !== newsID);
            setNews(updatedNewsList);
            alert("News item deleted successfully.");
        } else {
            alert("Failed to delete news item.");
        }
    }

    const handleArchiveNews = async (newsId, newStatus) => {
        const response = await changeRequestNewsIntoDB(newsId, newStatus);
        if (response) {
            setNews((prevNews) => prevNews.filter(news => news._id !== newsId));
            alert(`News Archived successfully.`);
        }
    };

    return (
        <div className="w-full mx-auto">
            <div className="bg-white border-2 border-gray-300 shadow-lg">
                {/* Header with Search */}
                <div className="bg-black  px-4 md:px-6 py-3 md:py-4 border-b-4 border-gray-800">
                    <h2 className=" !text-white text-xl md:text-2xl font-bold uppercase tracking-wide mb-3 md:mb-4">সংবাদ পরিচালনা</h2>
                    <div className="relative">
                        <input
                            type="text"
                            name="search"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            placeholder="সংবাদ অনুসন্ধান করুন..."
                            className="w-full px-4 py-2 md:py-3 text-white border-2 border-gray-300 focus:border-white focus:outline-none text-base md:text-lg"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">লোড হচ্ছে...</p>
                        </div>
                    ) : news.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">কোনো সংবাদ খুঁজে পাওয়া যায়নি</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {news.map(item => (
                                (role !== 'admin' || item.requested === "approved") &&
                                <div key={item._id} className="border-2 border-gray-200 hover:border-black transition-colors">
                                    {/* News Item Header */}
                                    <div className="p-3 md:p-4 bg-gray-50 border-b border-gray-200">
                                        <h3 className="font-bold text-base md:text-lg text-gray-800 mb-2">{item.title}</h3>
                                        <div className="flex gap-4 text-sm text-gray-600 mb-3">
                                            <span className="font-semibold">বিভাগ: <span className="text-black">{item.category}</span></span>
                                            <span className="font-semibold">লেখক: <span className="text-black">{item.author}</span></span>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            <Link
                                                href={`/home/${item.category}/${item._id}`}
                                                target="_blank"
                                                className="flex-1 sm:flex-initial text-center px-3 md:px-4 py-2 bg-blue-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-blue-700 transition-colors"
                                            >
                                                বিস্তারিত দেখুন
                                            </Link>
                                            <button
                                                onClick={() => handleUpdateFormOpen(item._id, item.title, item.content, item.featured)}
                                                className={`flex-1 sm:flex-initial px-3 md:px-4 py-2 font-bold uppercase text-xs tracking-wide transition-colors ${openNewsUpdateForm === item._id
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                    }`}
                                            >
                                                {openNewsUpdateForm === item._id ? 'বন্ধ করুন' : 'সম্পাদনা'}
                                            </button>
                                            <button
                                                onClick={() => confirm("আপনি কি এই সংবাদটি আর্কাইভ করতে চান?") && handleArchiveNews(item._id, 'declined')}
                                                className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-orange-500 text-white font-bold uppercase text-xs tracking-wide hover:bg-orange-600 transition-colors"
                                            >
                                                আর্কাইভ করুন
                                            </button>
                                            <button
                                                onClick={() => {
                                                    confirm("আপনি কি নিশ্চিত এই সংবাদটি মুছে ফেলতে চান?") && filterOutNews(item._id, item.thumbnailPath)
                                                }}
                                                className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-red-600 text-white font-bold uppercase text-xs tracking-wide hover:bg-red-700 transition-colors"
                                            >
                                                মুছুন
                                            </button>
                                        </div>
                                    </div>

                                    {/* Edit Form */}
                                    {openNewsUpdateForm === item._id && (
                                        <div className="p-6 bg-white border-t-4 border-gray-300">
                                            <form onSubmit={(e) => handleUpdateFormSubmit(item._id, item.thumbnailPath, e)} className="space-y-6">
                                                {/* Title Field */}
                                                <div className="border-b border-gray-200 pb-4">
                                                    <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                                                        শিরোনাম *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        value={updateTitleinput}
                                                        onChange={(e) => setUpdateTitleInput(e.target.value)}
                                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-lg"
                                                    />
                                                </div>

                                                {/* Content Field */}
                                                <div className="border-b border-gray-200 pb-4">
                                                    <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                                                        বিস্তারিত *
                                                    </label>
                                                    <textarea
                                                        name="content"
                                                        value={updateContentinput}
                                                        onChange={(e) => setUpdateContentInput(e.target.value)}
                                                        rows="12"
                                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                                                    />
                                                </div>

                                                {/* Category Field */}
                                                <div className="border-b border-gray-200 pb-4">
                                                    <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                                                        বিভাগ *
                                                    </label>
                                                    <select
                                                        defaultValue={item.category}
                                                        name="category"
                                                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors bg-white cursor-pointer"
                                                    >
                                                        <option value="--Select Category--" disabled>-- বিভাগ নির্বাচন করুন --</option>
                                                        <option value="বাংলাদেশ">বাংলাদেশ</option>
                                                        <option value="রাজনীতি">রাজনীতি</option>
                                                        <option value="বিশ্ব">বিশ্ব</option>
                                                        <option value="বাণিজ্য">বাণিজ্য</option>
                                                        <option value="মতামত">মতামত</option>
                                                        <option value="খেলা">খেলা</option>
                                                        <option value="বিনোদন">বিনোদন</option>
                                                        <option value="চাকরি">চাকরি</option>
                                                        <option value="জীবনযাপন">জীবনযাপন</option>
                                                    </select>
                                                </div>

                                                {/* Thumbnail Upload */}
                                                <div className="border-b border-gray-200 pb-4">
                                                    <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                                                        প্রধান ছবি
                                                    </label>
                                                    <div className="mb-4">
                                                        <Image src={item.thumbnailPath} alt={item.title} width={200} height={150} className="border-2 border-gray-300" />
                                                    </div>
                                                    <div className="border-2 border-dashed border-gray-300 hover:border-black transition-colors p-4">
                                                        <input
                                                            type="file"
                                                            name="thumbnail"
                                                            accept="image/*"
                                                            className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:font-bold file:uppercase file:text-xs file:tracking-wide hover:file:bg-gray-800 file:cursor-pointer"
                                                        />
                                                        <p className="text-sm text-gray-600 mt-2">নতুন ছবি নির্বাচন করুন (ঐচ্ছিক)</p>
                                                    </div>
                                                </div>

                                                {/* Featured Checkbox */}
                                                <div className="border-b border-gray-200 pb-4">
                                                    <label className="flex items-center space-x-3 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="isFeatured"
                                                            checked={isfeaturedinput}
                                                            onChange={(e) => setIsFeaturedInput(e.target.checked)}
                                                            className="w-5 h-5 border-2 border-gray-300 cursor-pointer"
                                                        />
                                                        <span className="text-gray-800 font-bold uppercase text-sm tracking-wide">
                                                            ফিচার্ড সংবাদ হিসেবে চিহ্নিত করুন
                                                        </span>
                                                    </label>
                                                </div>

                                                {/* Submit Button */}
                                                <div className="pt-4">
                                                    <button
                                                        type="submit"
                                                        disabled={isPending}
                                                        className={`w-full px-8 py-4 font-bold uppercase text-sm tracking-wider transition-all ${isPending
                                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                            : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
                                                            }`}
                                                    >
                                                        {isPending ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
