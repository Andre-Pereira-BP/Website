import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

const PageHeader = ({ title, children }: PageHeaderProps) => {
  return (
    <div className="w-full">
      {/* Header com título da página */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 uppercase">{title}</h1>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b py-2 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{title}</span>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;