import { normalize } from 'normalizr';
import * as actions from './productsActions';
import Api, { schemas } from '../../api';
import { viewerServices } from '../viewer';

export function fetchLatest() {
  return async function fetchLatestThunk(dispatch) {
    try {
      dispatch(actions.fetchLatest.start());

      const result = await Api.Products.getLatest();
      const data = normalize(result.data, schemas.Products);

      await dispatch(actions.fetchLatest.success(data));
    } catch (err) {
      dispatch(actions.fetchLatest.error({ message: err.message }));
    }
  };
}

export function addProduct(body) {
  return async function addProductThunk(dispatch) {
    try {
      dispatch(actions.addProduct.start());

      const result = await Api.Products.addProduct(body);
      const data = normalize(result.data, schemas.Product);

      await dispatch(actions.addProduct.success(data));

      return data;
    } catch (err) {
      dispatch(actions.addProduct.error({ message: err.message }));
      throw err;
    }
  };
}

export function fetchProduct(id) {
  return async function fetchProductThunk(dispatch) {
    try {
      dispatch(actions.fetchProduct.start());

      const result = await Api.Products.get(id);
      const data = normalize(
        viewerServices.avatarColorSetter(result.data),
        schemas.ProductWithOwner,
      );

      await dispatch(actions.fetchProduct.success(data));
    } catch (err) {
      dispatch(actions.fetchProduct.error({ message: err.message }));
    }
  };
}

export function fetchSeller(id) {
  return async function fetchSellerThunk(dispatch) {
    try {
      dispatch(actions.fetchSeller.start());

      const result = await Api.Products.getSeller(id);
      const data = normalize(
        viewerServices.avatarColorSetter(result.data),
        schemas.user,
      );

      dispatch(actions.fetchSeller.success(data));
    } catch (err) {
      dispatch(actions.fetchSeller.error({ message: err.message }));
    }
  };
}

export function fetchSellerProducts(id) {
  return async function fetchSellerProductsThunk(dispatch) {
    try {
      dispatch(actions.fetchSellerProducts.start());

      const result = await Api.Products.getSellerProducts(id);
      const data = normalize(result.data, schemas.sellerList);

      dispatch(actions.fetchSellerProducts.success(data));
    } catch (err) {
      dispatch(actions.fetchSellerProducts.error({ message: err.message }));
    }
  };
}

export function saveProduct(product) {
  return async function saveProductThunk(dispatch) {
    const savedProduct = {
      ...product,
      saved: true,
    };
    const newProduct = normalize(savedProduct, schemas.Product);
    try {
      console.log(newProduct);
      dispatch(actions.saveProduct.start(newProduct));

      await Api.Products.saveProduct(newProduct.result);

      dispatch(actions.saveProduct.success());
    } catch (err) {
      const { entities } = normalize(product, schemas.Product);
      dispatch(actions.saveProduct.error({ entities, err }));
    }
  };
}

export function removeFromSaved(product) {
  return async function removeFromSavedThunk(dispatch) {
    const unSavedProduct = {
      ...product,
      saved: false,
    };
    const newProduct = normalize(unSavedProduct, schemas.Product);
    try {
      dispatch(actions.removeFromSaved.start(newProduct));

      await Api.Products.removeFromSaved(newProduct.result);

      dispatch(actions.removeFromSaved.success());
    } catch (err) {
      const { entities } = normalize(product, schemas.Product);
      dispatch(actions.removeFromSaved.error({ entities, err }));
    }
  };
}

export function fetchSaved() {
  return async function fetchSavedThunk(dispatch) {
    try {
      dispatch(actions.fetchSaved.start());

      const result = await Api.Products.fetchSaved();
      const data = normalize(result.data, schemas.Products);

      dispatch(actions.fetchSaved.success(data));
    } catch (err) {
      dispatch(actions.fetchSaved.error({ message: err.message }));
    }
  };
}
