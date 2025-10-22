import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import './directory.styles.scss';

const Directory = ({ categories }) => {
	return (
		<div className="directory-container">
			{categories.map((cat) => {
				return <CategoryItem key={cat.id} category={cat} />;
			})}
		</div>
	);
};

export default Directory;
