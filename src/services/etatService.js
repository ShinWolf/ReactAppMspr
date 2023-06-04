export const getEtat = async (pEtatUrl) => {
    try {
        const response = await fetch(`https://s3-4381.nuage-peda.fr${pEtatUrl}`);
        const jsonData = await response.json();
        const { libelle } = jsonData;
        return { libelle };
    } catch (error) {
        console.error('Error:', error)
    }
}

export const getEtats = async () => {
    try {
        const response = await fetch(`https://s3-4381.nuage-peda.fr/mspr/api/etats`);
        const jsonData = await response.json();
        return jsonData['hydra:member'];
    } catch (error) {
        console.error('Error:', error)
    }
}