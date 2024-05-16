
import { FormEventHandler } from "react"

export type PromptType = {
    prompt: string,
    tag: string
}

export type FormParams = {
    type: string,
    post: PromptType,
    setPost: Function,
    submitting: boolean,
    handleSubmit: FormEventHandler
}