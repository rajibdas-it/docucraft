import ContentDisplay from '@/components/ContentDisplay';
import { getDoucments } from '@/lib/doc';
import { getDocsByAuthor } from '@/utils/doc-util';
import React from 'react';

const AuthorPage = ({ params: { name } }) => {
    const docs = getDoucments()
    const matchedDocs = getDocsByAuthor(docs, name)
    return (
        <div>
            <ContentDisplay id={matchedDocs[0].id} />
        </div>
    );
};

export default AuthorPage;