import { useState, useEffect } from 'react';
import { getPosts } from '../services/postService';
import { getComment } from '../services/commentService'
import { getRawUser } from '../services/userService';
import { FormComment } from './Form'
import imag from '../img/images.png';
import '../css/posts.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const postsData = await getPosts();
                const updatedPosts = await Promise.all(
                    postsData.map(async (post) => {
                        const postUserData = await getRawUser(post.user);
                        const postUser = postUserData.pseudo;
                        const updatedCommentUrls = await Promise.all(
                            post.commentaire.map(async (commentUrl) => {
                                const commentData = await getComment(commentUrl);
                                if (commentData) {
                                    const userData = await getRawUser(commentData.user);
                                    const user = userData.pseudo;
                                    return {
                                        id: commentData.id,
                                        contenu: commentData.contenu,
                                        user,
                                        date_comment: commentData.date_comment,
                                    }

                                } else {
                                    return null;
                                }
                            })
                        );
                        return { ...post, user: postUser, commentaire: updatedCommentUrls.filter(Boolean) };
                    })
                );
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Error:', error);
            }
        })();

    }, []);

    return (
        <div className="container">
            {posts.length > 0 ? (
                <div>
                    {posts.sort((a, b) => new Date(b.date) - new Date(a.date)).map((post) => (
                        <div className="card" key={post.id}>
                            <img src={imag} alt="Post" />
                            <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                            <p>User: {post.user}</p>
                            <p>Description: {post.description}</p>
                            <h3>Comments:</h3>
                            {post.commentaire.length > 0 ? (
                                <div className="comments-container">
                                    <div className="comments-scroll">
                                        {post.commentaire.map((comment) => (
                                            <div key={comment.id} className="comment">
                                                <p>
                                                    <span className="comment-user">{comment.user}: </span>
                                                    {comment.contenu}
                                                </p>
                                                <p className="comment-date">
                                                    {new Date(comment.date_comment).toLocaleDateString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="textarea-container">
                                    <p className="no-comments">No comments available.</p>
                                </div>
                            )}
                            <div className="form-comment">
                                <FormComment idPost={post.id} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default Home;
