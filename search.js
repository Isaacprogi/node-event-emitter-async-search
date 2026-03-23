const API = require('./mock-api');

const EventEmitter = require('events');

class Search extends EventEmitter {
  constructor() {
    super();
  }

  async searchCount(query) {
    try {
      this.emit("SEARCH_STARTED", {term:query}); 

       if(!query){
        this.emit("SEARCH_ERROR",   {message: 'INVALID_TERM', term : searchTerm}); 
        return
       }

      const count = await API.countMatches(query);
      this.emit('SEARCH_SUCCESS', {count: count, term : searchTerm});

    } catch (err) {
      this.emit('SEARCH_ERROR',   {message: err.message, term : searchTerm}); 
    }
  }
}


module.exports = Search;