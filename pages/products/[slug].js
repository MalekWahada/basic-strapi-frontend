import Head from 'next/head';
import { twoDecimals } from '../../utils/format';
import { API_URL, fromImageToUrl } from '../../utils/urls';

const Product = ({ product }) => {
    return (
        <div>
            <Head>
                {product.meta_title &&
                    <title>{product.meta_title}</title>
                }
                {product.meta_description &&
                    <meta name="description" content={product.meta_description} />
                }
            </Head>
            <h3>{product.name}</h3>
            <img src={fromImageToUrl(product.image)} />
            <h3>{product.name}</h3>
            <p>${twoDecimals(product.price)}</p>

            <p>
                {product.content}
            </p>
        </div>
    )
}


export async function getStaticProps({ params: { slug } }) {
    const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
    const found = await product_res.json();

    return {
        props: {
            product: found[0] //API Reponse is an array
        }
    }
}

export async function getStaticPaths() {
    // Retreive all the possible paths
    const products_res = await fetch(`${API_URL}/products/`)
    const products = await products_res.json();
    // Return them to NextJS context
    return {
        paths: products.map(product => ({
            params: { slug: String(product.slug) }
        })),
        fallback: false //Tells to nextjs to show a 404 in case of the param is not matched
    }
}

export default Product;