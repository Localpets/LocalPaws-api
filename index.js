import Server from './src/models/server.model.js';

// Start the server
const App = new Server();
App.routes();
App.listen();

export default App;