export function getDocsByCategory(docs, category) {
    return docs.filter((doc) => doc.category === category)

}

export function getDocsByAuthor(docs, author) {
    return docs.filter((doc) => encodeURI(doc.author) === author)
}

export function getDocsByTag(docs, tag) {
    return docs.filter((doc) => doc.tags.some(inputTag => inputTag === tag))
}