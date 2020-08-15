import CurrentActiveTheme from './CurrentActiveTheme';

export default function (context) {
	const { hooks } = context;

	hooks.addContent('SiteInfoOverview_TableList', (site) => (
		<CurrentActiveTheme key="local-addon" site={site} context={context} />
	));
}
