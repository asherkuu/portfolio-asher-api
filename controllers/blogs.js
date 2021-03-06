const mongoose = require("mongoose");
const slugify = require("slugify");
const Blog = mongoose.model("Blog");

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find({ status: "published" }).sort({ createdAt: -1 });
    return res.json(blogs);
};

exports.getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });
        return res.json(blog);
    } catch (err) {
        return res.status(422).send(err.message);
    }
};

exports.createBlog = async (req, res) => {
    const blogData = req.body;
    blogData.userId = req.user.sub;
    const blog = new Blog(blogData);
    try {
        const createdBlog = await blog.save();
        return res.json(createdBlog);
    } catch (err) {
        return res.status(422).send(err.message);
    }
};

exports.updateBlog = async (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    Blog.findById(id, (err, blog) => {
        if (err) return res.status(422).send(err.message);
        if (body.status && body.status === "published" && !blog.slug) {
            blog.slug = slugify(blog.title, {
                replacement: "-",
                lower: true,
            });
        }

        blog.set(body);
        blog.updateAt = new Date();

        try {
            const updatedBlog = blog.save();
            return res.json(updatedBlog);
        } catch (err) {
            return res.status(422).send(err.message);
        }
    });
};

exports.getBlogsByUser = async (req, res) => {
    const userId = req.user.sub;
    const blogs = await Blog.find({ userId, status: { $in: ["draft", "published"] } });
    return res.json(blogs);
};
