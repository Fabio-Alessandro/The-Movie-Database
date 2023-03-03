const Card = ({title, poster}) => (

	<div className="card">
		<div className="card-image">
			<figure className="image is-2by3">
				<img 
					src={
						
						poster ? 
							`https://image.tmdb.org/t/p/original${poster}` : 
							"https://i.ibb.co/bLb5Y24/unavailable-movie-poster.jpg"
					} 
					alt="Movie Poster"
				/>
			</figure>
		</div>
		<div className="card-content ">
			<div className="media">
				<div className="media-content">
					<p className="title is-7">{title}</p>
				</div>
			</div>
		</div>
	</div>
);

export default Card;