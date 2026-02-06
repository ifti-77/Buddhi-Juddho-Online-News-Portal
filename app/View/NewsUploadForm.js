
'use client'

import { useActionState } from 'react'
import { uploadNews } from '@/actions/uploadNews'

const initialState = { ok: false, errors: {}, message: '' }

export default function NewsUploadForm() {
    const [state, formAction, isPending] = useActionState(uploadNews, initialState)

    const fieldErrors = (name) =>
        state?.errors?.[name]?.map((e, i) => (
            <p key={i} className="text-red-600 text-sm mt-1">{e}</p>
        ))

    return (
        <div className="w-full mx-auto">
            <div className="bg-white border-2 border-gray-300 shadow-lg">
                <div className="bg-black  px-4 md:px-6 py-3 md:py-4 border-b-4 border-gray-800">
                    <h2 className=" !text-white text-xl md:text-2xl font-bold uppercase tracking-wide">সংবাদ আপলোড করুন</h2>
                </div>

                <form action={formAction} className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            শিরোনাম *
                        </label>
                        <input 
                            type="text" 
                            name="title" 
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-lg"
                            placeholder="সংবাদের শিরোনাম লিখুন..."
                        />
                        {fieldErrors('title')}
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            বিস্তারিত *
                        </label>
                        <textarea 
                            name="content"
                            rows="12"
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors resize-none"
                            placeholder="সংবাদের বিস্তারিত বিবরণ লিখুন..."
                        />
                        {fieldErrors('content')}
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            বিভাগ *
                        </label>
                        <select 
                            defaultValue="--Select Category--" 
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
                        {fieldErrors("category")}
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            প্রধান ছবি *
                        </label>
                        <div className="border-2 border-dashed border-gray-300 hover:border-black transition-colors p-8 text-center">
                            <input 
                                type="file" 
                                name="thumbnail"
                                accept="image/*"
                                className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white file:font-bold file:uppercase file:text-sm file:tracking-wide hover:file:bg-gray-800 file:cursor-pointer"
                            />
                        </div>
                        {fieldErrors("thumbnail")}
                    </div>

                    {/* Featured Checkbox */}
                    <div className="border-b border-gray-200 pb-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="isFeatured" 
                                value="yes"
                                className="w-5 h-5 border-2 border-gray-300 cursor-pointer"
                            />
                            <span className="text-gray-800 font-bold uppercase text-sm tracking-wide">
                                ফিচার্ড সংবাদ হিসেবে চিহ্নিত করুন
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 space-y-3">
                        <button 
                            type="submit"
                            disabled={isPending}
                            className={`w-full px-6 md:px-8 py-3 md:py-4 font-bold uppercase text-sm tracking-wider transition-all ${
                                isPending 
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                    : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
                            }`}
                        >
                            {isPending ? 'প্রক্রিয়াধীন...' : 'সংবাদ প্রকাশ করুন'}
                        </button>

                        {state?.message && (
                            <p className={`font-bold text-center ${state.ok ? 'text-green-600' : 'text-red-600'}`}>
                                {state.message}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}



