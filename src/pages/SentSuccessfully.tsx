import { Link } from 'react-router';
import { useLocation } from 'react-router';

import { routes } from '../router/routes';

function SentSuccessfully() {
    const Location = useLocation();

    const { header, slogan } = Location.state;

	return (
		<main dir="rtl" className="flex min-h-[65vh] items-center justify-center px-4 py-12 text-center text-primary">
			<section className="w-full max-w-xl rounded-3xl border border-[#D9F2E4] bg-[#F4FBF7] px-6 py-10 shadow-[0_12px_35px_rgba(45,190,115,0.12)] sm:px-12">
				<div className="success-pop mx-auto flex size-24 items-center justify-center rounded-full bg-secondary text-white shadow-[0_10px_20px_rgba(45,190,115,0.28)]" aria-hidden="true">
					<svg className="size-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5 12.5L9.5 17L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>

				<h1 className="mt-7 text-3xl font-bold sm:text-4xl">{header}</h1>
				<p className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-heading-text/85 sm:text-lg">
					{slogan}
				</p>
				<p className="mt-3 text-sm font-medium text-body-text">تقدر تقفل الصفحة أو ترجع للصفحة الرئيسية.</p>

				<Link to={routes.home} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-7 py-3 text-base font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
					العودة للصفحة الرئيسية
				</Link>
			</section>
		</main>
	);
}

export default SentSuccessfully;
