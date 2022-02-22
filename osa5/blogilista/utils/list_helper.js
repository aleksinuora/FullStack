const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.map(blog => {
        const l = blog.likes
        return l
    }).reduce((previous, current) => {
        const s = previous + current
        return s
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((max, current) => 
                                    max.likes > current.likes 
                                        ? max 
                                        : current)
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return undefined
    const authors = lodash.groupBy(blogs, blog => blog.author)
    const authKeys = Object.keys(authors)
    const most = lodash.maxBy(authKeys, author => authors[author].length)
    const mostObj = { author: most, blogs: authors[most].length }
    return mostObj
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return undefined
    const blogsByAuthors = lodash.groupBy(blogs, blog => blog.author)
    const authKeys = Object.keys(blogsByAuthors)
    const most = lodash.maxBy(authKeys, author => 
        totalLikes(blogsByAuthors[author]))
    const mostObj = {
        author: most,
        likes: totalLikes(blogsByAuthors[most])
    }
    return mostObj
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}