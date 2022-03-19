const replaceClientTags = (value) => {
    const serverString = value
        .replaceAll('<i>', '<voice>')
        .replaceAll('</i>', '</voice>')
        .replaceAll('<small>', '<user>')
        .replaceAll('</small>', '</user>')

    return serverString
}
const replaceServerTags = (value) => {
    const serverString = value
        .replaceAll('<voice>', '<i>')
        .replaceAll('</voice>', '</i>')
        .replaceAll('<user>', '<small>')
        .replaceAll('</user>', '</small>')
    return serverString
}
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export const variantsConstructor = (activeKeyboardType, previus) => {

    let newVariants
    const initialVariants = [
        {id: 1, word: '', right: true},
        {id: 2, word: '', right: false}
    ]
    switch (activeKeyboardType) {
        case 1:
            newVariants = (previus)
                ?
                previus.filter(variant => (variant.id === 1 || variant.id === 2))
                : [...initialVariants]
            break;
        case 2:
            newVariants = [...(previus) ? previus : initialVariants, {id: 3, word: '', right: false}, {
                id: 4,
                word: '',
                right: false
            }]

            break;
        default:
            break;
    }
    return newVariants

}