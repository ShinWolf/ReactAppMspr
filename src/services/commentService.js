export const getComment = async (commentUrl) => {
    try {
        const response = await fetch(`https://s3-4381.nuage-peda.fr${commentUrl}`);
        const commentData = await response.json();
        const { id, contenu, user, date_comment } = commentData;
        return { id, contenu, user, date_comment };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const createComment = async (commentData) => {
    try {
        const response = await fetch('https://s3-4381.nuage-peda.fr/mspr/api/commentaires', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        });

        if (response.ok) {
            console.log('Commentaire créé avec succès');
        } else {
            console.error('Erreur lors de la création du commentaire');
        }
    } catch (error) {
        console.error('Erreur:', error);
    }
}