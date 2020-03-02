const { app, startServer } = require('../../dist/src/app.js');



describe('Server POL', () => {
  it('starts with port', () => {
    jest.spyOn(global.console, 'log');
    startServer(3000)
      .then((server) => {
        server.close(() => {
          expect(console.log).toHaveBeenCalledWith('Listening on 3000')
        })
      })
  });
  it('starts without port', () => {
    jest.spyOn(global.console, 'log');
    startServer()
      .then((server) => {
        server.close(() => {
          expect(console.log).toHaveBeenCalledWith('Listening on 3001')
        });
      })
  })
})
