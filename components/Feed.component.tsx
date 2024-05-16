"use client"

import {useState, useEffect, ChangeEvent} from 'react';

import PromptCardListComponent from './PromptCardList.component';
import { PromptType } from '@types';

function FeedComponent() {

  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<PromptType[]>([])

  const handleSearchChange = (e: ChangeEvent): void => {

  }

  useEffect(()=>{
    const fetchPosts = async() => { 
      const response = await fetch("/api/prompt");

      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input 
        type="text" 
        placeholder='Search for a tag or a user name'
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer" 
        />
      </form>

      <PromptCardListComponent
      data={posts}
      handleTagClick={() => {}}
      />
    </section>
  )
}

export default FeedComponent