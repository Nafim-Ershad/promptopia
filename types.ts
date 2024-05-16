import { Schema } from "mongoose"
import { FormEventHandler } from "react"

export type PromptType = {
    prompt: string,
    tag: string,
    _id: string | Schema.Types.ObjectId | null
}

export type FormParams = {
    type: string,
    post: PromptType,
    setPost: Function,
    submitting: boolean,
    handleSubmit: FormEventHandler
}