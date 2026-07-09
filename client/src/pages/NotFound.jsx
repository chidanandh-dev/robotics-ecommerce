import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12 text-center">
      <div>
        <p className="text-7xl font-black text-sky-600">404</p>
        <h1 className="mt-4 text-4xl font-black text-slate-950">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 font-bold text-white hover:bg-sky-700">
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
