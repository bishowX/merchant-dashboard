const MerchantDetails = ({ name, description, image }) => {
	return (
		<div className="w-full flex gap-4">
			<img className="rounded-full w-[96px] h-[96px]" width={96} height={96} src={image} alt="" />
			<div>
				<h1>{name}</h1>
				<h1>{description}</h1>
			</div>
		</div>
	);
};

export default MerchantDetails;
