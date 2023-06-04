import React, { useEffect, useState } from 'react';
import { getUser, getRawUser } from '../services/userService';
import { getPosts } from '../services/postService';
import { getEtat } from '../services/etatService';
import imag from '../img/images.png';
import '../css/profil.css';

const Profil = () => {
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const userData = await getUser('/mspr/api/users/1');
                setUserData(userData);
            } catch (error) {
                console.log('Error:', error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const postsData = await getPosts();
                const updatedPosts = await Promise.all(
                    postsData.map(async (post) => {
                        if (post.user === '/mspr/api/users/1') {
                            const postUserData = await getRawUser(post.user);
                            const postUser = postUserData.pseudo;
                            const postEtat = await getEtat(post.etat);
                            return { ...post, user: postUser, etat: postEtat };
                        } else {
                            return null;
                        }
                    })
                );
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Error:', error);
            }

        })();
    }, []);

    if (!userData) {
        return <div>Loading...</div>
    }
    return (
        <div className="profil-container">
            <div className="profil-header">
                <h1>Profil</h1>
                <p>Pseudo: {userData.pseudo}</p>
                <p>Role: {userData.role.libelle}</p>
            </div>

            {posts
                .filter((post) => post !== null) // Filtrer les objets null
                .map((post) => (
                    <div className="post-card" key={post.id}>
                        <img src={imag} alt="Post" />
                        <h2>{post.title}</h2>
                        <p>Description: {post.description}</p>
                        <p>État: {post.etat.libelle}</p>
                        <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                ))}
        </div>
    )
}

export default Profil;