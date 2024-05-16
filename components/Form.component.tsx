import Link from "next/link";

import { type FormParams } from "@types"
import { ChangeEvent } from "react";

function FormComponent({
  type, post, setPost, submitting, handleSubmit,
}: FormParams): React.ReactNode {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and Share amazing prompts with the world, and let your imagination run wild with any A.I. powered platform.
      </p>

      <form 
      className="w-full mt-10 max-w-2xl flex flex-col gap-7 glassmorphism"
      onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semiboldtext-base text-gray-700">
            Your A.I. Prompt
          </span>

          <textarea
          value={post.prompt}
          onChange={(e: ChangeEvent) => setPost({
            ...post, 
            prompt: (e.target as HTMLInputElement).value
          })}
          placeholder="Write your prompt here..."
          required
          className="form_textarea"
          />
        </label>
        
        <label>
          <span className="font-satoshi font-semiboldtext-base text-grey-700">
            Tag {" "}
            <span className="font-normal">(#product, #webdevelopment, #idea)</span>
          </span>
          <input
          value={post.tag}
          onChange={(e: ChangeEvent) => setPost({
            ...post, 
            tag: (e.target as HTMLInputElement).value
          })}
          placeholder="#tag"
          required
          className="form_input"
          />
        </label>

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancel
            </Link>
            <button 
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            >
              {submitting ? `${type}...`: type}
            </button>
          </div>

          
      </form>
    </section>
  )
}

export default FormComponent