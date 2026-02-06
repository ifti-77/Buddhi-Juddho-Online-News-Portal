import React from "react";

function About() {
  const categories = [
    "বাংলাদেশ",
    "রাজনীতি",
    "বিশ্ব",
    "বাণিজ্য",
    "মতামত",
    "খেলা",
    "বিনোদন",
    "চাকরি",
    "জীবনযাপন",
  ];

  return (
    <div className="bg-[#f8f7f4] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-white border-2 border-gray-300 p-8">
          <div className="border-b-4 border-black pb-4 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wide">
              আমাদের সম্পর্কে
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Intro */}
            <h2 className="text-2xl font-bold mb-2">বুদ্ধিযুদ্ধ</h2>
            <p className="text-lg leading-relaxed mb-4">
              <strong>বুদ্ধিযুদ্ধ</strong> বাংলাদেশ থেকে প্রকাশিত বাংলা ভাষার একটি{" "}
              <strong>সাপ্তাহিক সংবাদপত্র</strong>। পত্রিকাটির যাত্রা শুরু{" "}
              <strong>২০০৭</strong> সালে। <strong>রেজিস্ট্রেশন: KN 458</strong>।
              পত্রিকাটির প্রধান প্রকাশনা/কার্যক্রমের কেন্দ্র <strong>ফরিদপুর</strong>
              ।
            </p>

            <p className="text-lg leading-relaxed mb-4">
              বুদ্ধিযুদ্ধ-এর <strong>অনলাইন নিউজ পোর্টাল</strong>–এ{" "}
              <strong>২৪/৭</strong> সংবাদ প্রকাশ করা হয়—যাতে পাঠক দ্রুত, সহজে এবং
              যাচাই-বাছাই করা তথ্য পেতে পারেন।
            </p>

            {/* Paper details */}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-400 inline-block pb-1">
                পত্রিকার বিবরণ
              </h2>

              <ul className="list-disc pl-6 text-gray-800">
                <li>
                  <strong>প্রকাশনা ধরন:</strong> সাপ্তাহিক (প্রিন্ট)
                </li>
                <li>
                  <strong>অনলাইন সংস্করণ:</strong> ২৪/৭ নিউজ আপডেট
                </li>
                <li>
                  <strong>রেজিস্ট্রেশন:</strong> KN 458
                </li>
                <li>
                  <strong>যাত্রা শুরুর বছর:</strong> ২০০৭
                </li>
                <li>
                  <strong>প্রধান প্রকাশনা এলাকা:</strong> ফরিদপুর
                </li>
              </ul>

              <div className="mt-4 text-gray-700">
                <p className="mb-1">
                  <strong>প্রকাশক ও সম্পাদক:</strong> এস.এম. জাহিদ হোসেন
                </p>
                <p className="mb-1">
                  <strong>বার্তা সম্পাদক:</strong> মেজবাহ উদ্দিন
                </p>
                <p className="mb-1">
                  <strong>আইন উপদেষ্টা:</strong> এডভোকেট বিশ্বজিৎ গাঙ্গুলী
                </p>
                <p className="mb-1">
                  <strong>বিজ্ঞাপন ও বাণিজ্য সম্পাদক:</strong> এস.এম. আকাশ
                </p>
                <p className="mb-0">
                  <strong>অফিস:</strong> ১ নং লেন আয়শা ভিলা, আলিপুর, ফরিদপুর
                </p>
              </div>
            </div>

            {/* Categories */}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-400 inline-block pb-1">
                নিয়মিত বিভাগ
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <ul className="list-disc pl-6 text-gray-800">
                  {categories.slice(0, Math.ceil(categories.length / 2)).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <ul className="list-disc pl-6 text-gray-800">
                  {categories.slice(Math.ceil(categories.length / 2)).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Commitment */}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-400 inline-block pb-1">
                আমাদের অঙ্গীকার
              </h2>

              <p className="text-lg leading-relaxed mb-4">
                বুদ্ধিযুদ্ধ বিশ্বাস করে—সত্যনিষ্ঠতা, দায়িত্বশীলতা এবং তথ্যভিত্তিক
                সাংবাদিকতাই গণমাধ্যমের মূল শক্তি। আমরা গুজব নয়, প্রমাণভিত্তিক সংবাদ;
                পক্ষপাত নয়, ন্যায্য বিশ্লেষণ—এই নীতিতেই কাজ করি।
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-gray-300 mt-6 pt-6">
              <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-400 inline-block pb-1">
                যোগাযোগ
              </h2>

              <p className="text-gray-700">
                ইমেইল: <span className="font-medium">buddhijuddho@yahoo.com</span>
                <br />
                ফোন: <span className="font-medium">+৮৮০১৭১১০৩০৯৯০ (প্রকাশক ও সম্পাদক), +৮৮০১৭২৪২৫১৫৮৮ (বার্তা সম্পাদক), +৮৮০১৭৪৭৮০২১৮ (আইন উপদেষ্টা), +৮৮০১৯১৩৭২৫২৪৭ (বিজ্ঞাপন ও বাণিজ্য সম্পাদক)</span>
                <br />
                ঠিকানা: <span className="font-medium">১ নং লেন আয়শা ভিলা, আলিপুর, ফরিদপুর</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default About;
