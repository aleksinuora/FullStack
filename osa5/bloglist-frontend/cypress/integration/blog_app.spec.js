const defaultUser = {
  username: 'Superuser',
  name: 'root',
  password: 'salasana'
}

const defaultBlog = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', defaultUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Superuser')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('root successfully logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Superuser')
      cy.get('#password').type('salsasauna')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Superuser')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(defaultBlog.title)
      cy.get('#author').type(defaultBlog.author)
      cy.get('#url').type(defaultBlog.url)
      cy.get('#create-button').click()

      cy.contains(defaultBlog.title)

      cy.contains('view').click()
      cy.contains(defaultBlog.url)
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(defaultBlog.title)
      cy.get('#author').type(defaultBlog.author)
      cy.get('#url').type(defaultBlog.url)
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be removed', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(defaultBlog.title)
      cy.get('#author').type(defaultBlog.author)
      cy.get('#url').type(defaultBlog.url)
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains(defaultBlog.title).should('not.exist')
    })
  })
})