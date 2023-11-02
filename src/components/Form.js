import { useState } from 'react';
import { createComment } from '../services/commentService';
import { Link } from 'react-router-dom';
import '../css/login.css';

export const FormLogin = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');

    const handlePseudoChange = (e) => setPseudo(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleOnSubmit = async (e) => {

        // try {
        //     const userData = {
        //         "pseudo": pseudo,
        //         "password": password,
        //     };
        //     await checkUserData(userData);

        //     setTextarea('');
        // } catch (error) {
        //     console.error('Erreur:', error);
        // }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleOnSubmit}>
                <h1>Connexion</h1>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Pseudo"
                    onChange={handlePseudoChange}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handlePasswordChange}
                />
                <button className="login-button" type="submit">
                    Se connecter
                </button>
                <p>Vous n'avez pas de compte ? <Link to="/signUp">Inscrivez-vous ici</Link>.</p>
            </form>
        </div>
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

export const InscriptionForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [motDePasse2, setMotDePasse2] = useState('');

    const handlePseudoChange = (e) => {
        setPseudo(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMotDePasseChange = (e) => {
        setMotDePasse(e.target.value);
    };

    const handleMotDePasseChange2 = (e) => {
        setMotDePasse2(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        // e.preventDefault();
        // if (motDePasse === motDePasse2) {
        //     try {
        //         const userData = {
        //             "pseudo": pseudo,
        //             "email": email,
        //             "password": motDePasse,
        //         }

        //         await createHashRouter(userData);
        //     } catch (error) {
        //         console.log(error)
        //     }
        // } else {
        //     console.log("Mot de passe différent")
        // }
    };

    return (
        <div className="inscription-container">
            <h2>Inscription</h2>
            <form className="inscription-form" onSubmit={handleOnSubmit}>
                <input type="text" placeholder="Pseudo" value={pseudo} onChange={handlePseudoChange} />
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={handleMotDePasseChange} />
                <input type="password" placeholder="Mot de passe" value={motDePasse2} onChange={handleMotDePasseChange2} />
                <button type="submit">S'inscrire</button>
                <p>
                    Vous avez déjà un compte ? <Link to="/connexion">Connectez-vous ici</Link>.
                </p>
            </form>
        </div>
    );
};
