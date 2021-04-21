//import "cypress-localstorage-commands"

describe("Initial opening and logging in", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "testuser",
      name: "Tapani J. Kansa",
      password: "usertest",
    })
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "testimies",
      name: "Testaaja Timo",
      password: "miestesti",
    })
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function () {
    cy.contains("Blogs")
  })

  it("login form can be opened and log in works", function () {
    cy.contains("log in").click()
    cy.get("#Username").type("testuser")
    cy.get("#Password").type("usertest")
    cy.get("#login-button").click()
    cy.contains("Tapani J. Kansa logged in")
  })

  it("wrong credentials fail & red erro msg", function () {
    cy.contains("log in").click()
    cy.get("#Username").type("hackerman")
    cy.get("#Password").type("ezhakingGG")
    cy.get("#login-button").click()
    cy.contains("Unauthorized")
    cy.get(".failure").should("have.css", "color", "rgb(255, 0, 0)")
    cy.reload()
  })
})

describe("When logged in", function () {
  beforeEach(function () {
    cy.login({ username: "testuser", password: "usertest" })
    cy.contains("log in").click()
    cy.get("#Username").type("testuser")
    cy.get("#Password").type("usertest")
    cy.get("#login-button").click()
  })

  it("when logged in create blog and log out visible", () => {
    cy.contains("log out")
    cy.contains("new blog")
  })

  it("new blog visibilities", () => {
    cy.contains("new blog").click()
    cy.get(".togglableContent").should("have.css", "display", "block")
    cy.contains("cancel").click()
    cy.get(".togglableContent").should("have.css", "display", "none")
  })

  it("adding blog works", () => {
    cy.contains("new blog").click()
    cy.get("#addTitle").type("How to test with cypress!")
    cy.get("#addAuthor").type("HackerMan")
    cy.get("#addUrl").type("www.testdeezNutz.com")
    cy.get("#saveBlog").click()
    cy.createBlog({
      title: "How to test with cypress!",
      author: "HackerMan",
      url: "www.testdeezNutz.com",
    })
    cy.contains("How to test with cypress!")
    cy.contains("HackerMan")
  })
})

describe("Already created blogs are visible", function () {
  beforeEach(function () {
    cy.login({ username: "testuser", password: "usertest" })
    cy.createBlog({
      author: "Ismo Laitela",
      title: "Kentaurin parhaat",
      url: "www.ravintolakentauri.fi",
    })
    cy.createBlog({
      author: "Seppo Taalasmaa",
      title: "Talonmies Taalasmaa",
      url: "www.talonmiehetUnite.fi",
    })

    cy.login({ username: "testimies", password: "miestesti" })
    cy.createBlog({
      author: "Snoop Dogg",
      title: "Drop it like its hot",
      url: "www.whendemp1mpsintecribma.com",
    })
  })

  it("Blogs can be liked and removed", function () {
    cy.contains("log in").click()
    cy.get("#Username").type("testuser")
    cy.get("#Password").type("usertest")
    cy.get("#login-button").click()
    cy.get(".blog").contains("view").click()
    cy.get(".blog").contains("like").click()
    cy.get(".removeBlog").first().click()
  })


})
