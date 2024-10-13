export const BlogCard = ({ blog }) => {
    return (
        <>
            <div className="card-grid-style-1">
                <div className="image-box">
                    <a href={`/blog/${blog._id}`}>
                        <img src={blog.images[0]?.url || "assets/imgs/page/blog/blog-1.jpg"} alt={blog.title} />
                    </a>
                </div>
                <a className="tag-dot font-xs no-underline" href={`/category/${blog.category}`}>
                    {blog.category}
                </a>
                <a className="color-gray-1100 no-underline" href={`/blog/${blog._id}`}>
                    <h4>{blog.title}</h4>
                </a>
                <div className="mt-20 row">
                    <div className={"col-8"}>
                        <span className="color-gray-500 font-xs mr-30">
                            {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                        </span>
                        {/*<span className="color-gray-500 font-xs">*/}
                        {/*    {blog.readTime || '4'} Mins read*/}
                        {/*</span>*/}
                    </div>
                    <div className="col-4 text-end">
                        <a className="btn btn-gray font-xs font-medium" href={`/blog/${blog.slug}`}>Read more</a>
                    </div>
                </div>
            </div>
        </>
    );
};
