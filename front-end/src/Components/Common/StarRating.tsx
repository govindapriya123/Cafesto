import  { useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons

const StarRating = ({ totalStars = 5 }) => {
    const [rating, setRating] = useState(0);
    
    // const handleClick = (index: number) => {
    //     setRating(index + 1); // Set the rating to the index + 1 (1-based)
    // };

    return (
        <div style={{ display: 'flex', cursor: 'pointer' }}>
            {[...Array(totalStars)].map((_, index) => (
                <FaStar
                    key={index}
                    color={ "#ffc107" } // Set star color based on rating
                    style={{ margin: '0 5px' }}
                    size={15} // Star size
                />
            ))}
        </div>
    );
};

export default StarRating;
