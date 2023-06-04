import { useState } from 'react';
import { createComment } from '../services/commentService';

export const FormLogin = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');

    const handlePseudoChange = (e) => setPseudo(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleOnSubmit = (e) => {
        console.log('Pseudo:', pseudo);
        console.log('Password:', password);
        setPseudo('');
        setPassword('');
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" placeholder="Pseudo" onChange={handlePseudoChange}></input>
            <input type="password" placeholder="Mot de passe" onChange={handlePasswordChange}></input>
            <button type="submit">Se connecter</button>
        </form>
    );
};

export const FormComment = (idPost) => {
    const [textarea, setTextarea] = useState('');

    const handleChange = (e) => setTextarea(e.target.value);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const commentData = {
                "contenu": textarea,
                "user": '/mspr/api/users/1',
                "post": `/mspr/api/posts/${idPost.idPost}`,
                "dateComment": new Date()
            };
            await createComment(commentData);

            setTextarea('');
        } catch (error) {
            console.error('Erreur:', error);
        }

    };

    return (
        <form onSubmit={handleOnSubmit}>
            <textarea placeholder="Ajouter un commentaire" value={textarea} onChange={handleChange}></textarea>
            <button type="submit">Commenter</button>
        </form>
    );
};

