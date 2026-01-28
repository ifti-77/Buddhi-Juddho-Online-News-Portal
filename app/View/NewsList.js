"use client"

import { DeleteNewsFromDB, fetchNewsFromDB, fetchSpecificNewsFromDB, updateNewsIntoDB } from "@/lib/newsInteractions";
import { useEffect, useEffectEvent, useState } from "react"
import Image from "next/image";
import { replaceThumbnailWithNewId } from "@/actions/uploadNews";
import Link from "next/link";

export default function NewsList() {

    const [news, setNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [updateTitleinput, setUpdateTitleInput] = useState("");
    const [updateContentinput, setUpdateContentInput] = useState("");
    const [isfeaturedinput, setIsFeaturedInput] = useState(false);
    const [openNewsUpdateForm, setOpenNewsUpdateForm] = useState("");
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        async function fetchNews() {

            const response = await fetchNewsFromDB();
            const data = await response
            setNews(data);
        }
        fetchNews();
    }, []);

    useEffect(() => {
        async function fetchSpecificNews() {

            const response = await fetchSpecificNewsFromDB(searchTerm);
            const data = await response
            setNews(data);
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
        // Perform update operation here
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
        if(await DeleteNewsFromDB(newsID, current_thumbnail))
        {
            const updatedNewsList = news.filter(item => item._id !== newsID);
            setNews(updatedNewsList);
            alert("News item deleted successfully.");
        }else{
            alert("Failed to delete news item.");
        }
    }

    return (
        <div>
            Search: <input type="text" name="search" value={searchTerm} onChange={handleSearchInputChange} /><br />
            <label>News List</label>
            <ul>
                {news.map(item => (
                    item.requested === "approved" && <div key={item._id}>
                        <li>{item.title} - {item.category}
                            <button><Link href={`/${item.category}/${item._id}`} target="_blank">Read More</Link></button>
                            <button onClick={() => handleUpdateFormOpen(item._id, item.title, item.content, item.featured)}>{openNewsUpdateForm === item._id ? "Close Edit" : "Edit"}</button>
                            <button onClick={() => {
                                confirm("Are you sure you want to delete this news item?") && filterOutNews(item._id, item.thumbnailPath)
                            }}>Delete</button>
                        </li>
                        {openNewsUpdateForm === item._id && <div>
                            <form onSubmit={(e) => handleUpdateFormSubmit(item._id, item.thumbnailPath, e)}>
                                <label>
                                    Title:
                                    <input type="text" name="title" value={updateTitleinput} onChange={(e) => setUpdateTitleInput(e.target.value)} />
                                </label>
                                <label>
                                    Content:
                                    <textarea name="content" value={updateContentinput} onChange={(e) => setUpdateContentInput(e.target.value)} />
                                </label>
                                <label>
                                    Category:
                                    <select defaultValue={item.category} name="category">
                                        <option value="--Select Category--" disabled>--Select Category--</option>
                                        <option value="সর্বশেষ">সর্বশেষ</option>
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
                                </label>

                                <label>
                                    <Image src={item.thumbnailPath} alt={item.title} width={100} height={100} />
                                    <input type="file" name="thumbnail" accept="image/*" />
                                </label>
                                <label>
                                    Feature this news article?
                                    <input type="checkbox" name="isFeatured" checked={isfeaturedinput} onChange={(e) => setIsFeaturedInput(e.target.checked)} />
                                </label>
                                <button disabled={isPending}>
                                    {isPending ? 'Updating...' : 'Update'}
                                </button>
                            </form>
                        </div>}
                    </div>
                ))}
            </ul>
        </div>
    )
}
