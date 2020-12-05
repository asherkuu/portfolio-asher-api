const { portfolios, blogs } = require("./data");
const Portfolio = require("../db/models/portfolio");
const Blogs = require("../db/models/blogs");

class FakeDB {
    async clean() {
        // await Portfolio.deleteMany({});
        await Blogs.deleteMany({});
    }
    async addData() {
        // await Portfolio.create(portfolios);
        await Blogs.create(blogs);
    }
    async populate() {
        await this.clean();
        await this.addData();
    }
}

module.exports = new FakeDB();
