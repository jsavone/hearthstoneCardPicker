const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if(!req.session.user_cards){
       req.session.user_cards = [];
     }
    knex('cards').then((results) => {
      res.render("cards", {cards:results,user_cards:req.session.user_cards});
    })
  },

  create: function(req, res) {
    knex('cards').insert({
      mana: req.body.mana,
      attack: req.body.attack,
      health: req.body.health,
      description: req.body.description
    }).then(() => {
    res.redirect('/')
    })
  },

  add: function(req, res) {
    knex('cards').where('id', req.params.id).then((result) => {
      req.session.user_cards.push(result[0]);
      req.session.save(()=>{
      res.redirect('/')
      })
    })
  },

  remove: function(req, res) {
    let deck = req.session.user_cards;
    if (deck.length == 1) {
      req.session.user_cards = [];
      req.session.save(()=>{
      res.redirect('/')
      })
      return;
    }
    for (let i = 0; i < deck.length; i++) {
      if (deck[i].id == req.params.id) {
        deck.splice(i,1);
        req.session.save(()=>{
        res.redirect('/')
        })
        return;
      }
    }
    res.redirect('/')
  }

}
