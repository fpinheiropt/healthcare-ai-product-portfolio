import { useParams, Navigate } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';
import { documents } from '../data/documents';

function DocumentPage() {
    const { id } = useParams<{ id: string }>();

    if (!id || !documents[id]) {
        return <Navigate to="/" replace />;
    }

    const doc = documents[id];

    return (
        <MarkdownViewer
            content={doc.content}
            title={doc.title}
        />
    );
}

export default DocumentPage;
