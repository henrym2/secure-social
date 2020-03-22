module.exports = {
    user : {
        constructor(uData) {
            const {email, password, secret, trustedUsers, posts } = uData
            this.email = email
            this.password = password
            this.secret = secret
            this.trusted = trustedUsers || []
            this.posts = posts || []
        },
        addPost(post) {
            this.posts.append(post)
        },
        addTrusted(trusted){
            this.trusted.append(trusted)
        }
    },
    post : {
        constructor(pData) {
            const { title, author, body, encrypted, trusted } = pData 
            this.title = title
            this.author = author
            this.body = body
            this.encrypted = encrypted || false
            this.trusted = trusted || []
        }
    }
}