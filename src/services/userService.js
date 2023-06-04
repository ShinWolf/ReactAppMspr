export const getRawUser = async (pUserUrl) => {
    try {
        const response = await fetch(`https://s3-4381.nuage-peda.fr${pUserUrl}`);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const getUser = async (pUserUrl) => {
    try {
        const userData = await getRawUser(pUserUrl);
        const roleData = await getRole(userData.role);
        return { ...userData, role: roleData };
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export const getRole = async (pRoleUrl) => {
    try {
        const response = await fetch(`https://s3-4381.nuage-peda.fr${pRoleUrl}`);
        const jsonData = await response.json();
        const { libelle } = jsonData;
        return { libelle };
    } catch (error) {
        console.error('Error:', error)
    }
}