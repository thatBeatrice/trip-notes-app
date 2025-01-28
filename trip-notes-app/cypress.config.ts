import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',

    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/performance/**/*.cy.{js,jsx,ts,tsx}',
    ],

    setupNodeEvents(on, config) {},

  },
});
