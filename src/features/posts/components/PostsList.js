import { useSelector } from "react-redux"
import { allSelectedPosts } from "../postsSlice"
import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import TimePosted from "./TimePosted"

const PostsList = () => {
    const posts = useSelector(allSelectedPosts)
    // Set post by most recent
    const postOrder = posts.slice().sort((a,b) => b.date.localeCompare(a.date))

    const renderedPosts = postOrder.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
              <PostAuthor userId={post.userId}/>
              <TimePosted timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}

export default PostsList
