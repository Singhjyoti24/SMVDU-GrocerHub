import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RecipeSuggestions() {
    const location = useLocation();
    const navigate = useNavigate();
    const recipes = location.state?.recipes;

    if (!recipes) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '24px', color: '#333', fontWeight: 'bold' }}>No Recipes Found</h1>
                <p style={{ color: '#777', fontSize: '16px' }}>Please try again with a different ingredient list.</p>
                <button onClick={() => navigate(-1)} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#f0ad4e', border: 'none', borderRadius: '5px', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>
                    Go Back
                </button>
            </div>
        );
    }

    const formatRecipeText = (text) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*/g, '');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '28px', color: '#4CAF50', fontWeight: 'bold', borderBottom: '2px solid #4CAF50', paddingBottom: '10px' }}>Recipe Suggestions</h1>

            {/* Go to Home button at the top right corner */}
            <button 
                onClick={() => navigate('/shop/home')} 
                style={{
                    position: 'absolute', 
                    top: '20px', 
                    right: '20px', 
                    padding: '10px 20px', 
                    backgroundColor: '#4CAF50', 
                    border: 'none', 
                    borderRadius: '5px', 
                    color: '#fff', 
                    fontSize: '16px', 
                    cursor: 'pointer'
                }}
            >
                Go to Home
            </button>

            <div>
                {recipes.split('\n').map((recipe, index) => (
                    <div 
                        key={index} 
                        dangerouslySetInnerHTML={{ __html: formatRecipeText(recipe) }}
                    />
                ))}
            </div>
        </div>
    );
}

export default RecipeSuggestions;
