module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs", {title: 'Vital Cook Book - HomePage'});
  },
};
