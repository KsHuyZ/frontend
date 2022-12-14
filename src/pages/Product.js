import { useEffect, useState } from "react";
import axios from "../lib/axios";
import OutLineBg from "../OutLineBg";
import CircularProgress from "@mui/material/CircularProgress";
import notFound from "../assets/images/NotFound.svg";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [categorySelected, setCategorySelected] = useState(-1);
  const [name, setName] = useState("");
  const [namePreview, setNamePreview] = useState("");
  const [price, setPrice] = useState(20000);
  const [pricePreview, setPricePreview] = useState("20000");
  const [option, setOption] = useState("new");
  const [isLoading, setIsLoading] = useState(false);
  const handleGetAllProduct = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/products/get-by-price");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 2000);
  };

  const hanldeGetAllCategories = async () => {
    try {
      const res = await axios.get("/categories/get-all");
      setCategories(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCategory = (id, index) => {
    id ? setCategorySelected(index) : setCategorySelected(-1);
    id ? setCategory(id) : setCategory();
  };

  const handleSearchProductByName = async (options, categoryy) => {
    let categoryCheck;
    if (categoryy === "not") {
      categoryCheck = null;
    } else if (categoryy) {
      categoryCheck = categoryy;
    } else {
      categoryCheck = category;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/products/filter-by-price", {
        name,
        price,
        sort: typeof options !== String ? option : options,
        categoryId: categoryCheck,
      });

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => setIsLoading(false), 2000);
  };

  useEffect(() => {
    handleGetAllProduct();
    hanldeGetAllCategories();
  }, []);

  return (
    <>
      <OutLineBg>
        <div className="box-products">
          <div className="box-image-head">
            <div className="container">
              <p className="txt-text">S???N PH???M</p>
            </div>
          </div>
          <div className="box-content">
            <div className="container">
              <nav className="woocommerce-breadcrumb">
                <a href="/">Trang ch???</a>&nbsp;/&nbsp;S???n ph???m
              </nav>
              <form className="woocommerce-ordering" method="get">
                <select
                  name="orderby"
                  className="orderby"
                  onChange={(e) => {
                    setOption(e.target.value);
                    handleSearchProductByName(e.target.value);
                  }}
                >
                  <option value="new" selected="selected">
                    M???i nh???t
                  </option>
                  <option value="price">Gi?? th???p ?????n cao</option>
                  <option value="price-desc">Gi?? cao xu???ng th???p</option>
                </select>
                <input type="hidden" name="paged" defaultValue={1} />
                <input
                  type="hidden"
                  name="fbclid"
                  defaultValue="IwAR2Py_aKj8B6yBk9I-I4pK_7PZO0HpzhJO8diAg4cI6wMJwXlXNma-stsdk"
                />
              </form>
              <div className="box-content-left-top">
                <div className="row">
                  <div className="custom-col-left custom-col-sm">
                    <div className="box-content-left">
                      <div
                        id="woocommerce_product_search-2"
                        className="widget woocommerce widget_product_search"
                      >
                        <h3 className="widget-title">T??m ki???m s???n ph???m</h3>
                        <form
                          role="search"
                          method="get"
                          className="woocommerce-product-search"
                          action="https://green.hap.vn/"
                        >
                          <label
                            className="screen-reader-text"
                            htmlFor="woocommerce-product-search-field-0"
                          >
                            T??m ki???m cho:
                          </label>
                          <input
                            type="search"
                            id="woocommerce-product-search-field-0"
                            className="search-field"
                            placeholder="T??m s???n ph???m???"
                            name="s"
                            onChange={(e) => setName(e.target.value)}
                          />
                          <button
                            type="button"
                            value="T??m ki???m"
                            onClick={handleSearchProductByName}
                          >
                            T??m ki???m
                          </button>
                          <input
                            type="hidden"
                            name="post_type"
                            defaultValue="product"
                          />
                        </form>
                      </div>
                      <div
                        id="woocommerce_price_filter-2"
                        className="widget woocommerce widget_price_filter"
                      >
                        <h3 className="widget-title">L???c theo gi??</h3>
                        <form
                          method="get"
                          action="https://green.hap.vn/san-pham/"
                        >
                          <div className="price_slider_wrapper">
                            <div
                              className="price_slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                              style={{}}
                            >
                              <input
                                type="range"
                                min={10000}
                                max={500000}
                                defaultValue={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />
                              <span className="range-max" />
                            </div>
                            <div className="price_slider_amount">
                              <input
                                type="text"
                                id="min_price"
                                name="min_price"
                                defaultValue={14500}
                                data-min={14500}
                                placeholder="Gi?? th???p nh???t"
                                style={{ display: "none" }}
                              />
                              <input
                                type="text"
                                id="max_price"
                                name="max_price"
                                defaultValue={499000}
                                data-max={499000}
                                placeholder="Gi?? cao nh???t"
                                style={{ display: "none" }}
                              />
                              <button
                                type="button"
                                className="button"
                                onClick={handleSearchProductByName}
                              >
                                L???c
                              </button>
                              <div className="price_label" style={{}}>
                                Gi??:{" "}
                                <span className="from">{price}&nbsp;???</span> ???{" "}
                                <span className="to">500000&nbsp;???</span>
                              </div>
                              <input
                                type="hidden"
                                name="fbclid"
                                defaultValue="IwAR2Py_aKj8B6yBk9I-I4pK_7PZO0HpzhJO8diAg4cI6wMJwXlXNma-stsdk"
                              />
                              <div className="clear" />
                            </div>
                          </div>
                        </form>
                      </div>
                      <div
                        id="woocommerce_product_categories-2"
                        className="widget woocommerce widget_product_categories"
                      >
                        <h3 className="widget-title">Danh m???c s???n ph???m</h3>
                        <ul className="product-categories">
                          <li
                            className="cat-item cat-item-204"
                            style={{
                              backgroundColor:
                                categorySelected === -1 ? "#0000007a" : "",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleSelectCategory();
                              handleSearchProductByName(option, "not");
                            }}
                          >
                            <div>T???t c??? s???n ph???m</div>
                          </li>
                          {categories.map((category, index) => (
                            <li
                              className="cat-item cat-item-204"
                              style={{
                                backgroundColor:
                                  categorySelected === index ? "#0000007a" : "",
                                cursor: "pointer",
                              }}
                              key={index}
                              onClick={() => {
                                handleSelectCategory(category._id, index);
                                handleSearchProductByName(option, category._id);
                              }}
                            >
                              <div>{category.name}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="custom-col-right">
                    <div
                      className="box-content-right"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        position: "relative",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress
                          color="inherit"
                          style={{
                            position: "absolute",
                            left: "30%",
                            top: "-90%",
                          }}
                        />
                      ) : products.length > 0 ? (
                        products?.map((product) => (
                          <div className="item-product">
                            <Link to={`/${product._id}`}>
                              <div className="item-content">
                                <a href className="custom-box">
                                  <img src={product.imgProduct} />
                                  <div className="box-text-content">
                                    <h2 className="woocommerce-loop-product__title">
                                      {product.name}
                                    </h2>
                                    <span className="price">
                                      <span className="woocommerce-Price-amount amount giam">
                                        {product.price}&nbsp;
                                        <span className="woocommerce-Price-currencySymbol">
                                          ???
                                        </span>
                                      </span>
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <img src={notFound} />
                          <div style={{ fontSize: 40, textAlign: "center" }}>
                            Kh??ng t??m th???y s???n ph???m
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OutLineBg>
    </>
  );
};

export default Product;
