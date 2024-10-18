import ContentDisplay from "@/components/ContentDisplay";
import { getDoucments } from "@/lib/doc";
import { getDocsByTag } from "@/utils/doc-util";

const TagPage = ({ params: { name } }) => {
    const docs = getDoucments()
    const matchedDocs = getDocsByTag(docs, name)

    return (
        <div>
            <ContentDisplay id={matchedDocs[0].id} />
        </div>
    );
};

export default TagPage;