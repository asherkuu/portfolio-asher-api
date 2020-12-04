const mongoose = require("mongoose");
const Portfolio = mongoose.model("Portfolio");

exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
};

exports.getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        return res.json(portfolio);
    } catch (err) {
        return res.status(422).send(err.message);
    }
};

exports.createPortfolio = async (req, res) => {
    const portfolioData = req.body;
    const portfolio = new Portfolio(portfolioData);
    const userId = "google-oauth2|101576468763773096376";
    portfolio.userId = userId;
    try {
        const newPortfolio = await portfolio.save();
        return res.json(newPortfolio);
    } catch (err) {
        return res.status(422).send(err.message);
    }
};
