export const getHashtags = async () => {
    try {
        const response = await fetch(`https://s3-4381.nuage-peda.fr/mspr/api/hashtags`);
        const jsonData = await response.json();
        return jsonData['hydra:member'];
    } catch (error) {
        console.error('Error:', error)
    }
}