const API = require('./mock-api');

const EventEmitter = require('events');

class Search extends EventEmitter {
  constructor() {
    super();
  }

  async searchCount(query) {
    try {
        if(query === undefined){
         this.emit("SEARCH_ERROR",   {message: 'INVALID_TERM', term : query}); 
         return
        }
        
      this.emit("SEARCH_STARTED", query); 


      const count = await API.countMatches(query);
      this.emit('SEARCH_SUCCESS', {count: count, term : query});

    } catch (err) {
      this.emit('SEARCH_ERROR',   {message: err.message, term : query}); 
    }
  }
}


module.exports = Search;