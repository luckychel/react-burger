describe('DND работает корректно', () => {
    beforeEach(() => {
      cy.intercept('GET', '*api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.visit('/');

      cy.getBySel('ingredient_bun').as('ingredientBun');
      cy.getBySel('ingredient_item').as('ingredientItem');
      cy.getBySel('react-modals').as('reactModals');
      
      cy.getBySel('bun_container').as('bunContainer');
      cy.getBySel('item_container').as('itemContainer');
    });
  
    it('Проверка dnd булки', () => {
      cy.get('@ingredientBun').should('exist')
      cy.get('@bunContainer').should('exist');
      
      cy.dnd('ingredient_bun', 'bun_container');
  
      cy.getBySel('bun_element').should('have.length', 2);
    })
  
   
    it('Проверка dnd ингредиента', () => {
      cy.get('@ingredientItem').should('exist')
      cy.get('@itemContainer').should('exist');
  
      cy.dnd('ingredient_item', 'item_container');
  
      cy.getBySel('item_container').getBySel('item_element').should('have.length.least', 1);
    })
  })
  
  describe('Модальное окно ингредиента работает корректно', () => {
    beforeEach(() => {
      cy.intercept('GET', '*api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.visit('/');
      cy.getBySel('ingredient_item').as('ingredientItem');
      cy.getBySel('react-modals').as('reactModals');
      
    });
  
    it('Проверка открытия модального окна ингредиента', () => {
      cy.get('@ingredientItem').should('exist');
      cy.get('@reactModals').should('exist');

      cy.get('@ingredientItem').first().then(($lnk) => {
        $lnk.trigger("click");
      })
      .find('img')
      .then(($img) => {
        cy.get('@reactModals').find('[data-test="ingredient_name"]')
          .should("have.text", $img.attr('alt'));
      });
    })
  
    it('Проверка закрытия модального окна ингредиента', () => {
      cy.get('@ingredientItem').should('exist');
      cy.get('@reactModals').should('exist');
  
      cy.get('@ingredientItem').first().click();
  
      cy.getBySel('modal_overlay').should('exist');
  
      cy.get('@reactModals').find('[data-test="modal_close_btn"]').click();
      cy.get('@reactModals').should('not.be.visible');
  
    })
  
    it('Проверка закрытия модального окна ингредиента при клике на Overlay', () => {
      cy.get('@ingredientItem').should('exist');
      cy.get('@reactModals').should('exist');
  
      cy.get('@ingredientItem').first().click();
  
      cy.getBySel('modal_overlay').should('exist');
  
      cy.get('@reactModals').find('[data-test="modal_overlay"]').trigger('click', { force: true });
      cy.get('@reactModals').should('not.be.visible');
  
    })
  })
  
  describe('Создание заказа работает корректно', () => {
    beforeEach(() => {
        window.localStorage.setItem("accessToken", "777key");
    });
    afterEach(()=> {
        cy.clearAllLocalStorage();
    })

    it('Проверка создания заказа', () => {
      cy.prepareStore();

      cy.get('@reactModals').should('exist');

      cy.dnd('ingredient_bun', 'bun_container');
      cy.dnd('ingredient_item', 'item_container');
  
      cy.getBySel('create_order_btn').should('not.be.disabled');
      cy.getBySel('create_order_btn').click();
  
      cy.get('@reactModals').find('[data-test="order_number"]')
          .should("have.text", "777");
    })
  })