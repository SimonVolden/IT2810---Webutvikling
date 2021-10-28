// sample_spec.js created with Cypress

// run from ./client/ with:
// node_modules\.bin\cypress open

  describe('End To End test', () => {
    
    beforeEach('Log in to the Beer Webpage', () => {
        // log in to user 1234@1234.no with correct credentials.
        // clearing saved filters and searches.
        cy.visit('http://localhost:3000')
        cy.get("[id=email]").should("exist").type("1234@1234.no")
        cy.get("[id=password]").should("exist").type(1234)
        cy.get("[id=SignIn]").should("exist").click()
        cy.get("[id=clear]").click()

    })

    it("Test Like Button", () => {
        // looking for ulikebutton that should not exist
        // liking a beer that should not be liked
        // looking for likebutton that should not exist
        // uliking a beer that should not be uliked
        cy.get("[id=ThumbUpButton8]").should("not.exist")
        cy.get("[id=ThumbUpOutlinedButton8]").should("exist").click()
        cy.get("[id=ThumbUpOutlinedButton8]").should("not.exist")
        cy.get("[id=ThumbUpButton8]").should("exist").click()
        
    })


    it("Test Logout and making new user with used email", () =>{
        cy.get("[id=headerTitle]").should("exist")
        cy.get("[id=LogoutButton]").click()
        cy.get("[id=headerTitle]").should("not.exist")
        cy.get("[id=signUp]").should("exist").click()
        cy.get("[id=email]").should("exist").type("1234@1234.no")
        cy.get("[id=password]").should("exist").type("1234")
        cy.get("[id=signUpButton]").click().should("exist").click()
        //since it wont redirect us with a used name
        cy.get("[id=signUp]").should("not.exist") 
    })


    it("Test Theme Toggle", ()=> {
        // toggling theme state from redux-store. 
        // check both states.
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "" })
        cy.get("[id=themeToggle]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: true,pageNumber: 1, search: "" })
        cy.get("[id=themeToggle]").click()    
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "" })
        })

    it("Test Page Number Counter", () => {
        // Tries different usecases for checking page number, 
        // checks for both legal and illegal entries.
        // checks is redux-store changes state.
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "" })
        cy.get("[id=incPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 2, search: "" })
        cy.get("[id=decPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "" })
        cy.get("[id=decPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "" })
        cy.get("[id=inputPageNumber]").click().type('{selectall}23')
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 23, search: "" })
        cy.get("[id=incPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 24, search: "" })
        cy.get("[id=incPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 24, search: "" })
        cy.get("[id=inputPageNumber]").click().type('{selectall}10')
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 10, search: "" })
        cy.get("[id=inputPageNumber]").click().type('{selectall}asfasfd100')
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 10, search: "" })
        cy.get("[id=clear]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "" })
        })


    it("Test Search function", () => {
        // checking different usecases for the search bar.
        // checks if the correct items shows up.
        // checks if the clear button works as intended.
        cy.findByText("Buzz").should("exist")
        cy.findByText("Trashy Blonde").should("exist")
        cy.get("[id=searchField]").type("Buzz")
        cy.findByText("Trashy Blonde").should("not.exist")
        cy.get("[id=clear]").click()
        cy.get("[id=incPageNumber]").click()
        cy.findByText("Buzz").should("not.exist")
        cy.findByText("Movember").should("exist")
        cy.get("[id=clear]").click()
        cy.findByText("Buzz").should("exist")
        cy.findByText("Movember").should("not.exist")
        })


  })