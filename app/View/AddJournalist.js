
import { addJournalist } from "@/actions/addJournalist";

export default function AddJournalist() {
    return (
        <div className="w-full mx-auto">
            <div className="bg-white border-2 border-gray-300 shadow-lg">
                {/* Header */}
                <div className="bg-black  px-4 md:px-6 py-3 md:py-4 border-b-4 border-gray-800">
                    <h2 className="!text-white text-xl md:text-2xl font-bold uppercase tracking-wide">নতুন সাংবাদিক নিয়োগ</h2>
                </div>

                {/* Form */}
                <form action={addJournalist} className="p-4 md:p-6 space-y-4 md:space-y-6">
                    {/* Name Field */}
                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            পুরো নাম *
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-lg"
                            placeholder="সাংবাদিকের পুরো নাম লিখুন..."
                        />
                    </div>

                    {/* Username Field */}
                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            ইউজারনেম *
                        </label>
                        <input 
                            type="text" 
                            name="username" 
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-lg"
                            placeholder="ইউনিক ইউজারনেম লিখুন..."
                        />
                    </div>

                    {/* Password Field */}
                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            পাসওয়ার্ড *
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-lg"
                            placeholder="নিরাপদ পাসওয়ার্ড দিন..."
                        />
                    </div>

                    {/* Role Field */}
                    <div className="border-b border-gray-200 pb-4">
                        <label className="block text-gray-800 font-bold mb-2 uppercase text-sm tracking-wide">
                            পদবী *
                        </label>
                        <select 
                            defaultValue='reporter' 
                            name="role"
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors bg-white cursor-pointer"
                        >
                            <option value="reporter">রিপোর্টার (Reporter)</option>
                            <option value="editor">সম্পাদক (Editor)</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-black text-white px-8 py-4 font-bold uppercase text-sm tracking-wider hover:bg-gray-800 transition-all hover:shadow-lg"
                        >
                            সাংবাদিক তৈরি করুন
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
