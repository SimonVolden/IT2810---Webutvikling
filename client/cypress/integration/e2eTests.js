// sample_spec.js created with Cypress

// run from ./client/ with:
// node_modules\.bin\cypress open

  describe('End To End test', () => {
    
    beforeEach('Log in to the Beer Webpage', () => {
        // log in to user 1234@1234.no with correct credentials.
        // clearing saved filters and searches.
        //cy.visit('http://localhost:3000/prosjekt4')
        cy.visit('http://it2810-44.idi.ntnu.no/prosjekt4')
        cy.get("[id=email]").should("exist").type("cypress@cypress.no")
        cy.get("[id=password]").should("exist").type("cypress")
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
        cy.get("[id=email]").should("exist").type("cypress@cypress.no")
        cy.get("[id=password]").should("exist").type("cypress")
        cy.get("[id=signUpButton]").click().should("exist").click()
        cy.window().its('store').invoke('getState')
        .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: true, textSize: 16})
        //since it wont redirect us with a used name
        cy.get("[id=signUp]").should("not.exist") 
    })


    it("Test Theme Toggle", ()=> {
        // toggling theme state from redux-store. 
        // check both states.
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=themeToggle]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: true,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=themeToggle]").click()    
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        })

    it("Test Page Number Counter", () => {
        // Tries different usecases for checking page number, 
        // checks for both legal and illegal entries.
        // checks is redux-store changes state.
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=incPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 2, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=decPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=decPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=inputPageNumber]").click().type('{selectall}23')
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 23, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=incPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 24, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=incPageNumber]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 24, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=inputPageNumber]").click().type('{selectall}10')
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 10, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=inputPageNumber]").click().type('{selectall}asfasfd100')
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 10, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=clear]").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
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
        
    it("Test Change of sorting by name", () =>{
        //sort by name
        cy.findByText("Buzz").should("exist")
        cy.findByText("#Mashtag 2013").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=FilterButton]").should("exist").click()
        cy.get("[id=name-menu-item]").should("exist").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "name", order: 1, signup: false, textSize: 16 })
        cy.findByText("#Mashtag 2013").should("exist")
        cy.findByText("Buzz").should("not.exist")
        cy.get("[id=clear]").click()
        cy.findByText("Buzz").should("exist")
        cy.findByText("#Mashtag 2013").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
    })

    it("Test Change of sorting by Alcohol precentage", () => {
        //sort by alcohol percentage
        cy.findByText("Buzz").should("exist")
        cy.findByText("Nanny State").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=FilterButton]").should("exist").click()
        cy.get("[id=abv-menu-item]").should("exist").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "abv", order: 1, signup: false, textSize: 16 })
        cy.findByText("Buzz").should("not.exist")
        cy.findByText("Nanny State").should("exist")
        cy.get("[id=clear]").click()
        cy.findByText("Buzz").should("exist")
        cy.findByText("Nanny State").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
    })

    it("Test Change of sorting by Likes", ()=> {
        cy.findByText("Buzz").should("exist")
        cy.findByText("Russian Doll – India Pale Ale").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=FilterButton]").should("exist").click()
        cy.get("[id=likes-menu-item]").should("exist").click()
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "likes", order: 1, signup: false, textSize: 16 })
        cy.findByText("Buzz").should("not.exist")
        cy.findByText("Russian Doll – India Pale Ale").should("exist")
        cy.get("[id=clear]").click()
        cy.findByText("Buzz").should("exist")
        cy.findByText("Russian Doll – India Pale Ale").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })

    })

    it("Test Change of order functions", ()=>{
        //testing sorting by id, changing order to dec.
        cy.findByText("Buzz").should("exist")
        cy.findByText("Blitz Saison").should("not.exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: 1, signup: false, textSize: 16 })
        cy.get("[id=FilterButton]").should("exist").click()
        cy.get("[id=id-menu-item]").should("exist").click()
        cy.findByText("Buzz").should("not.exist")
        cy.findByText("Blitz Saison").should("exist")
        cy.window().its('store').invoke('getState')
            .should("deep.equal", {  theme: false,pageNumber: 1, search: "", field: "id", order: -1, signup: false, textSize: 16 })
    })


        




  })