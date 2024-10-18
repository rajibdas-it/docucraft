import ContentDisplay from '@/components/ContentDisplay';
import { getDoucments } from '@/lib/doc';
import { getDocsByCategory } from '@/utils/doc-util';
import React from 'react';

const CategoriesPage = ({ params: { name } }) => {
    const docs = getDoucments()
    const matchedDocs = getDocsByCategory(docs, name)
    return (
        <div>
            <ContentDisplay id={matchedDocs[0].id} />
        </div>
    );
};

export default CategoriesPage;