export const buildUrl = (baseUrl, path, queryParams = {}) => {
    // Combinar la URL base con el path
    const url = `${baseUrl}${path}`;
    
    // Convertir los query parameters en string
    const queryString = Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined && value !== null) // Filtrar valores undefined/null
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    
    // Retornar la URL completa con los queries si existen
    return queryString ? `${url}?${queryString}` : url;
}