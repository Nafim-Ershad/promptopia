import { PromptType } from "@types";

import PromptCardComponent from "./PromptCard.component";

type PromptCardListParam = {
    data: any[],
    handleTagClick: VoidFunction
}

const PromptCardListComponent = ({data, handleTagClick}: PromptCardListParam) => {
  return (
    <div className="mt-16 prompt_layout">
        {
            data.map((post: any) => (
                <PromptCardComponent
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                />
            ))
        }
    </div>
  )
}

export default PromptCardListComponent