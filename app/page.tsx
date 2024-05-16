import FeedComponent from "@components/Feed.component";

function Home(){
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center">AI-Powered Propmpts</span>
            </h1>
            <p className="desc text-center">
                Promptopia is an AI prompting tool for modern world to discover, create and share creative prompts.
            </p>
            <FeedComponent/>
        </section>
    )
}

export default Home;