const API = require('./mock-api');

const EventEmitter = require('events');

class Search extends EventEmitter {
  constructor() {
    super();
  }

  async searchCount(query) {
    try {
      this.emit("SEARCH_STARTED", query); 

       if(!query){
        this.emit("SEARCH_ERROR",   {message: 'INVALID_TERM', term : query}); 
        return
       }

      const count = await API.countMatches(query);
      this.emit('SEARCH_SUCCESS', {count: count, term : query});

    } catch (err) {
      this.emit('SEARCH_ERROR',   {message: err.message, term : query}); 
    }
  }
}


module.exports = Search;