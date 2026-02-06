import React from "react";

function Terms() {
  const SUBMISSION_EMAIL = "buddhijuddho@yahoo.com";

  return (
    <div className="bg-[#f8f7f4] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-white border-2 border-gray-300 p-8">
          <div className="border-b-4 border-black pb-4 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              শর্তাবলী
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-4">
              বুদ্ধিযুদ্ধ ওয়েবসাইট ব্যবহার করলে এই শর্তাবলী মেনে নেওয়া হয়েছে বলে
              ধরা হবে। শর্তাবলীতে অসম্মত হলে অনুগ্রহ করে ওয়েবসাইট ব্যবহার করবেন না।
            </p>

            <h2 className="text-2xl font-bold mb-2">কন্টেন্ট ও কপিরাইট</h2>
            <p className="text-lg leading-relaxed mb-2">
              আলাদা করে উল্লেখ না থাকলে ওয়েবসাইটের লেখা/ছবি/ভিডিও/ডিজাইনসহ সকল কন্টেন্টের
              মেধাস্বত্ব বুদ্ধিযুদ্ধের।
            </p>
            <ul className="list-disc pl-6 text-gray-800 mb-4">
              <li>অনুমতি ছাড়া কন্টেন্ট পুনঃপ্রকাশ/বাণিজ্যিক ব্যবহার করা যাবে না।</li>
              <li>অনুমতি ছাড়া কন্টেন্ট সম্পাদনা করে পুনর্বিতরণ করা যাবে না।</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">গ্রহণযোগ্য ব্যবহার</h2>
            <ul className="list-disc pl-6 text-gray-800 mb-4">
              <li>সাইটের ক্ষতি, নিরাপত্তা ভাঙা, বা অন্যের ব্যবহারে বাধা দেওয়া যাবে না।</li>
              <li>ভাইরাস/ম্যালওয়্যার ছড়ানো, স্প্যাম, বা অননুমোদিত স্ক্র্যাপিং নিষিদ্ধ।</li>
              <li>অবৈধ/প্রতারণামূলক/মানহানিকর কন্টেন্ট বা কার্যক্রম নিষিদ্ধ।</li>
            </ul>

            <h2 className="text-2xl font-bold mb-2">সংবাদ জমা ও ব্যবহারকারীর কন্টেন্ট</h2>
            <p className="text-lg leading-relaxed mb-2">
              সংবাদ/প্রেস রিলিজ/তথ্য জমা দিতে ইমেইল করুন:{" "}
              <strong>{SUBMISSION_EMAIL}</strong>
            </p>
            <p className="text-lg leading-relaxed mb-4">
              আপনি যে কন্টেন্ট জমা দেবেন তা অবশ্যই সত্যতা যাচাইযোগ্য হতে হবে এবং
              কপিরাইট/আইন লঙ্ঘনকারী হতে পারবে না। বুদ্ধিযুদ্ধ প্রয়োজন অনুসারে প্রকাশ/সম্পাদনা/প্রত্যাখ্যান করতে পারে।
            </p>

            <h2 className="text-2xl font-bold mb-2">নিশ্চয়তা নেই ও দায়সীমা</h2>
            <p className="text-lg leading-relaxed mb-4">
              ওয়েবসাইট “যেমন আছে” ভিত্তিতে প্রদান করা হয়। তথ্য সর্বদা নির্ভুল/সম্পূর্ণ হবে—এমন নিশ্চয়তা নেই।
              আইন দ্বারা অনুমোদিত সীমার মধ্যে, ওয়েবসাইট ব্যবহারে প্রত্যক্ষ/পরোক্ষ ক্ষতির জন্য বুদ্ধিযুদ্ধ দায়ী নয়।
            </p>

            <h2 className="text-2xl font-bold mb-2">পরিবর্তন</h2>
            <p className="text-lg leading-relaxed">
              প্রয়োজন হলে শর্তাবলী যে কোনো সময় হালনাগাদ হতে পারে। হালনাগাদের পর ওয়েবসাইট ব্যবহার করলে
              নতুন শর্তাবলী প্রযোজ্য হবে।
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Terms;
