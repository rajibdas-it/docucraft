import React from 'react';

const ContentPage = ({ params: { contentId } }) => {
    // console.log(contentId);
    return (
        <div>
            {contentId}
        </div>
    );
};

export default ContentPage;