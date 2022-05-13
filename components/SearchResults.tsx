// import { useMemo } from "react"
import { List, ListRowRenderer } from "react-virtualized"
import { ProductItem } from "./ProductItem"
interface SearchResultsProps {
	totalPrice: number;
	results: Array<{
		id: number;
		price: number;
		priceFormatted: string;
		title: string;
	}>
	onAddToWishList: (id: number) => void;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {

	// const totalPrice = useMemo(() => {
	// 	return results.reduce((total, product) => {
	// 		return total + product.price;
	// 	}, 0)//comeca em zero
	// }, [results]);

	const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
		return (
			<div key={key} style={style}>
				<ProductItem
					product={results[index]}
					onAddToWishlist={onAddToWishList}
				/>
			</div>
		)
	}

	return (
		<div>
			<h2>{totalPrice}</h2>

			{/* {results.map(product => {
				return (
					<ProductItem
						product={product}
						key={product.id}
						onAddToWishlist={onAddToWishList}
					/>
				)
			})} */}
			<List
				height={300}
				rowHeight={30}
				width={900}
				overscanColumnCount={5}
				rowCount={results.length}
				rowRenderer={rowRenderer}
			/>
		</div>
	)
}