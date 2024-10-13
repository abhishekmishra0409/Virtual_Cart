import ReactStars from "react-rating-stars-component";

export const SmallProductCard = ({ product }) => {
    const { title, price, images, brand } = product;

    return (
        <div className="card-grid-style-2" style={{ margin: "auto" }}>
            <div className="image-box">
                <a href={`/product/${product._id}`} className="no-underline">
                    <img src={images[0]?.url || 'default-image.png'} alt={title} />
                </a>
            </div>
            <div className="info-right">
                <span className="font-xs color-gray-500">{brand.title}</span>
                <br />
                <a className="color-brand-3 font-sm-bold no-underline" href={`/product/${product._id}`}>
                    {title}
                </a>
                <div className="rating d-flex align-items-center">
                    <ReactStars
                        count={5}
                        value={product.totalrating || 0}
                        size={16}
                        activeColor="#ffd700"
                        edit={false}
                        isHalf={true}
                    />
                    <span className="font-xs color-gray-500">({product.ratings.length})</span>
                </div>
                <div className="price-info">
                    <strong className="font-lg-bold color-brand-3 price-main">₹{Number(product.price).toLocaleString('en-IN')}</strong>
                </div>
            </div>
        </div>
    );
};
