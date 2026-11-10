import { Compass } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { EmptyState, Button } from '../components/ui';

export function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <section className="section">
      <div className="container">
        <EmptyState
          icon={Compass}
          title="Oops — we couldn't find that page"
          description="The route you followed doesn't exist, or may have moved. Head back home or browse our edible cup flavours."
          action={
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
              <Button to="/">Go Home</Button>
              <Button to="/products" variant="outline">Browse Edible Cups</Button>
            </div>
          }
        />
      </div>
    </section>
  );
}

