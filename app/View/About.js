import React from 'react'

function About() {
  return (
    <div className="bg-[#f8f7f4] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <article className="bg-white border-2 border-gray-300 p-8">
          <div className="border-b-4 border-black pb-4 mb-6">
            <h1 className="text-4xl font-bold uppercase tracking-wide">সম্পর্কে</h1>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-4">
              অনলাইন নিউজ পোর্টাল একটি আধুনিক সংবাদ মাধ্যম যা দেশ ও বিদেশের সর্বশেষ খবর প্রদান করে।
            </p>
            <p className="text-lg leading-relaxed mb-4">
              আমাদের লক্ষ্য হলো সত্য, নিরপেক্ষ এবং নির্ভরযোগ্য সংবাদ পরিবেশন করা।
            </p>
            <div className="border-t border-gray-300 mt-6 pt-6">
              <h2 className="text-2xl font-bold mb-3 border-b-2 border-gray-400 inline-block pb-1">যোগাযোগ</h2>
              <p className="text-gray-700">
                ইমেইল: info@onlinenewsportal.com<br/>
                ফোন: +৮৮০ ১২৩৪৫৬৭৮৯
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default About