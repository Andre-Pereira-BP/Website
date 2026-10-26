import { Link } from 'react-router-dom';
import { adminListSiteContent } from '../../lib/content';
import { useAsync } from '../../lib/useAsync';
import { countOverrides, listTextFields, TEXT_PAGES } from '../siteTexts';
import { Badge, ErrorBox, formatDateTime, PageHeader, Spinner } from '../ui';

const FIELD_COUNTS = Object.fromEntries(TEXT_PAGES.map((page) => [page.id, listTextFields(page.dict).length]));

const TextsList = () => {
  const { data, error, loading, reload } = useAsync(() => adminListSiteContent());
  const rows = new Map((data ?? []).map((row) => [row.id, row]));

  return (
    <>
      <PageHeader
        title="Textos do site"
        description="Altere os textos de cada página, em português e em inglês. A estrutura das páginas mantém-se: só muda o texto."
      />

      {error ? <ErrorBox error={error} onRetry={reload} /> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TEXT_PAGES.map((page) => {
          const row = rows.get(page.id);
          const edited = countOverrides(row?.content);
          return (
            <Link
              key={page.id}
              to={`/admin/content/${page.id}`}
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md hover:ring-primary/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary">{page.label}</h2>
                {loading ? <Spinner className="h-4 w-4 text-gray-400" /> : edited > 0 ? <Badge tone="amber">{edited} alterados</Badge> : <Badge>Original</Badge>}
              </div>
              <p className="mt-2 flex-1 text-sm text-gray-500">{page.description}</p>
              <p className="mt-4 text-xs text-gray-400">
                {FIELD_COUNTS[page.id]} textos por idioma
                {row && ` · alterado em ${formatDateTime(row.updated_at)}`}
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TextsList;
