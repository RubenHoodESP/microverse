module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      url: ['http://localhost:3000'],
      numberOfRuns: 1
    },
    upload: {
      target: 'temporary-public-storage' // Puedes subir a tu dashboard o local si prefieres
    }
  }
};
