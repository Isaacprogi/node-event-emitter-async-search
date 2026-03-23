const API = require('./mock-api');

const EventEmitter = require('events');

class Search extends EventEmitter {
  constructor() {
    super();
  }

  async searchCount(query) {
    try {
      this.emit("SEARCH_STARTED", searchTerm); 

       if(query === undefined){
        this.emit("SEARCH_ERROR",   {message: 'INVALID_TERM', term : searchTerm}); 
        return
       }

      const count = await API.countMatches(query);
      this.emit('data', {count: count, term : searchTerm});
      
    } catch (err) {
      this.emit('error',   {message: err.message, term : searchTerm}); 
    }
  }
}


module.exports = Search;