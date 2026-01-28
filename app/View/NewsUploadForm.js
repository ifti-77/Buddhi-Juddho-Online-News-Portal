
'use client'

import { useActionState } from 'react'
import { uploadNews } from '@/actions/uploadNews'

const initialState = { ok: false, errors: {}, message: '' }

export default function NewsUploadForm() {
    const [state, formAction, isPending] = useActionState(uploadNews, initialState)

    const fieldErrors = (name) =>
        state?.errors?.[name]?.map((e, i) => (
            <p key={i} style={{ color: 'crimson', marginTop: 4 }}>{e}</p>
        ))

    return (
        <div>
            <label>Add News</label>
            <form action={formAction} className='flex flex-col gap-4 bg-gray-600 text-green-200'>
                <label>
                    Title:
                    <input type="text" name="title" />
                    {fieldErrors('title')}
                </label>

                <label>
                    Content:
                    <textarea name="content" />
                    {fieldErrors('content')}
                </label>
                <label>
                    Category:
                    <select defaultValue={`--Select Category--`} name="category">
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
                    {fieldErrors("category")}
                </label>

                <label>
                    Upload Thumbnail:
                    <input type="file" name="thumbnail" />
                    {fieldErrors("thumbnail")}
                </label>
                <label>
                    Feature this news article?
                    <input type="checkbox" name="isFeatured" value="yes" />
                </label>
                <button disabled={isPending}>
                    {isPending ? 'Submitting...' : 'Submit'}
                </button>

                {state?.message && <p>{state.message}</p>}
            </form>
        </div>
    )
}



