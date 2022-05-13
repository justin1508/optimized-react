import { memo, useState, lazy } from "react";
// import { AddProductToWishlist } from "./AddProductToWishlist";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
import dynamic from 'next/dynamic';
import lodash from 'lodash';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
	return import("./AddProductToWishlist").then(modulo => modulo.AddProductToWishlist)
}, {
	loading: () => <span>Carregando...</span>
});
interface ProductItemProps {
	product: {
		id: number;
		price: number;
		priceFormatted: string;
		title: string;
	},
	onAddToWishlist: (id: number) => void;
}

export function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
	const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

	// async function showFormattedDate() {
	// 	const { format } = await import('date-fns')

	// 	format()
	// }

	return (
		<div>
			{product.title} - <strong>{product.priceFormatted}</strong>
			{/* <button onClick={() => onAddToWishList(product.id)}>Add to wish list</button> */}
			<button onClick={() => setIsAddingToWishlist(true)}>Add to wish list</button>

			{isAddingToWishlist &&
				<AddProductToWishlist
					onAddToWishlist={() => onAddToWishlist(product.id)}
					onRequestClose={() => setIsAddingToWishlist(false)}
				/>
			}

		</div>
	)
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
	// return Object.is(prevProps.product, nextProps.product);
	return lodash.isEqual(prevProps.product, nextProps.product);
});