import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getEtats } from '../services/etatService'
import { getHashtags } from '../services/hashtagService';
import { createPost } from '../services/postService';
import '../css/uploadForm.css';

const PosterForm = () => {
    const [image, setImage] = useState(null);
    const [postState, setPostState] = useState('');
    const [selectedStage, setSelectedStage] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [etats, setEtats] = useState([]);
    const [hashtags, setHashtags] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handlePostStateChange = (e) => {
        setPostState(e.target.value);
    };

    const handleStageChange = (e) => {
        setSelectedStage(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                "date": new Date(),
                "user": "/mspr/api/users/2",
                "etat": `/mspr/api/etats/${postState}`,
                "Commentaire": [],
                "hashtag": `/mspr/api/hashtags/${selectedStage}`,
                "photo": image.name,
                "description": description,
                "commentaire": []
            }
            console.log(postData);
            await createPost(postData);
        } catch (error) {
            console.log("Error:", error);
        }
        setIsSubmitted(true);
    };

    useEffect(() => {
        (async () => {
            try {
                const etatData = await getEtats();
                const hashtagData = await getHashtags();
                setHashtags(hashtagData);
                setEtats(etatData);
            } catch (error) {
                console.error('Error:', error);
            }

        })();
    }, []);

    useEffect(() => {
        if (isSubmitted) {
            setImage(null);
            setPostState('');
            setSelectedStage('');
            setDescription('');
        }
    }, [isSubmitted]);

    if (isSubmitted) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
                <label>Choisi une image:</label>
                <input type="file" onChange={handleImageChange} />
            </div>
            <div className="form-group">
                <label>Post etat:</label>
                <select value={postState} onChange={handlePostStateChange}>
                    <option value="">Select an option</option>
                    {etats.map((etat) => (
                        <option key={etat.id} value={etat.id}>
                            {etat.libelle}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Hashtag:</label>
                <select value={selectedStage} onChange={handleStageChange}>
                    <option value="">Select a stage</option>
                    {hashtags.map((hashtag) => (
                        <option key={hashtag.id} value={hashtag.id}>
                            {hashtag.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea value={description} onChange={handleDescriptionChange} />
            </div>
            <button type="submit">Poster</button>
        </form>
    );
};

export default PosterForm;
