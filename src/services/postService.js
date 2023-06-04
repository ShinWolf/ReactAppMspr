export const getPosts = async () => {
  try {
    const response = await fetch('https://s3-4381.nuage-peda.fr/mspr/api/posts');
    const jsonData = await response.json();
    return jsonData['hydra:member'];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const createPost = async (postData) => {
  try {
    const response = await fetch('https://s3-4381.nuage-peda.fr/mspr/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      console.log('Post créé avec succès');
    } else {
      console.error('Erreur lors de la création du post');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
}