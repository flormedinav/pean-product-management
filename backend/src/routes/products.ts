import { Router } from 'express';
import { deleteProduct, getProduct, getProducts, postProduct, updateProduct } from '../controllers/product';

const router = Router(); 

router.get('/:id', getProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);
router.post('/', postProduct);
router.put('/:id', updateProduct);

export default router;