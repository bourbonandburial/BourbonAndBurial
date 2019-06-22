import React from 'react';
import './PackageDisplay.scss';
import productRequests from '../../../helpers/data/productRequests'
import SinglePackage from '../SinglePackage/SinglePackage'

class PackageDisplay extends React.Component{
state = {
    products: []
}

    displayProducts = () => {
        productRequests.getPackageProducts(this.props.package)
        .then((data) => {
            this.setState({ products: data });
        }).catch(err => console.error('error getting products', err));
    }

    componentDidMount = () => {
        this.displayProducts();
    }


    render() {
        const productBuilder = this.state.products.map((product) => {
            return (
            <SinglePackage
              productId={product.productId}
              key={product.productId}
              image={product.image}
              productName={product.productName}
              productTypeId={product.productTypeId}
              quantity={product.quantity}
              displayProducts={this.displayProducts}
            />);
          });
          return(
            <div>
                <div className="idk d-flex justify-content-around"><h3 className="review mt-3">Review Your Selected Package</h3> </div>
                <div className="builder d-flex justify-content-center"> {productBuilder}</div>
            </div>
        );
      }
    }

export default PackageDisplay;