import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'FrontEnd FAQ',
	description:
		'Теоретические вопросы и практические задачи по вселенной FrontEnd разработке',
	srcDir: 'src',
	markdown: {
		container: {
			tipLabel: '',
			warningLabel: '',
			dangerLabel: '',
			infoLabel: '',
			detailsLabel: 'Показать код',
		},
	},
	themeConfig: {
		search: {
			provider: 'local',
		},
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Теория', link: '/theory/index' },
			{ text: 'Практика', link: '/challenges/index' },
		],

		sidebar: [
			{
				text: 'Теория',
				items: [
					{
						text: 'HTML',
						link: '/theory/html/html',
						collapsed: true,
						items: [],
					},
					{ text: 'CSS', link: '/theory/css' },
					{
						text: 'Javascript',
						link: '/theory/js/dom',
						collapsed: true,
						items: [
							{ text: 'Взаимодействие с DOM?', link: '/theory/js/dom' },
							{ text: 'Типы данных', link: '/theory/js/types' },
							{ text: 'Строки', link: '/theory/js/string' },
							{ text: 'Числа', link: '/theory/js/number' },
							{ text: 'Массивы', link: '/theory/js/array' },
							{ text: 'Объекты', link: '/theory/js/object' },
							{ text: 'Map и Set', link: '/theory/js/map_set' },
							{ text: 'Асинхронность', link: '/theory/js/async' },
						],
					},
					{ text: 'Vue', link: '/theory/vue' },
					{
						text: 'Браузер',
						link: '/theory/browser/internet',
						collapsed: true,
						items: [
							{
								text: 'Как работает интеренет',
								link: '/theory/browser/internet',
							},
							{
								text: 'Загрузка документа и ресурсов',
								link: '/theory/browser/document_load',
							},
						],
					},
					{ text: 'Основы программирования', link: '/theory/programming/base' },
					{ text: 'Алгоритмы', link: '/theory/algorithms' },
					{ text: 'TypeScript', link: '/theory/typescript' },
					{ text: 'Git', link: '/theory/git' },
					{
						text: 'English',
						link: '/theory/english/verbs/to_be',
						collapsed: true,
						items: [
							{
								text: 'Глаголы',
								link: '/theory/english/verbs/to_be',
								collapsed: true,
								items: [
									{
										text: 'Глагол to be: что это такое и зачем нужен',
										link: '/theory/english/verbs/to_be',
									},
								],
							},
							{
								text: 'Местоимения',
								link: '/theory/english/pronouns/personal',
								collapsed: true,
								items: [
									{
										text: 'Личные местоимения',
										link: '/theory/english/pronouns/personal',
									},
								],
							},
						],
					},
				],
			},
			{
				text: 'Практика',
				items: [],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' },
		],
	},
})
